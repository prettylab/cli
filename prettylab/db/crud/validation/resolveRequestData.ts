import {
  ValidationError,
  type ValidationSchema,
  type ValidationErrorItem,
  type FieldRule,
} from "@prettylab/db/crud/validation/utils/types";
import {
  parsePath,
  collectMatches,
  setDeep,
  pathToString,
} from "@prettylab/db/crud/validation/utils/path";
import { CrudConfig } from "@prettylab/db/db/utils/types";
import prisma from "@prettylab/db/db/db";

export async function extractBody(req: any): Promise<any> {
  if (typeof req?.json === "function") {
    return await req.json();
  }

  if (req?.body !== undefined) {
    return req.body;
  }

  throw new Error("Unsupported request object passed");
}

function validatePrimitive(
  rule: FieldRule,
  value: any,
): { value: any; error?: string } {
  if (value === null) {
    if (!rule.nullable) {
      return { value, error: "This field may not be null." };
    }
    return { value };
  }

  if (rule.type === "string") {
    let v = value;
    if (typeof v !== "string") v = String(v);
    if (v.length === 0) {
      return { value: v, error: "This field may not be empty." };
    }
    if (rule.min != null && v.length < rule.min) {
      return { value: v, error: `Must be at least ${rule.min} characters.` };
    }
    if (rule.max != null && v.length > rule.max) {
      return { value: v, error: `Must be at most ${rule.max} characters.` };
    }
    return { value: v };
  }

  if (rule.type === "number") {
    let v = value;
    if (typeof v === "string") {
      v = v.trim() === "" ? NaN : Number(v);
    }
    if (typeof v !== "number" || Number.isNaN(v)) {
      return { value, error: "Must be a number." };
    }
    if (rule.min != null && v < rule.min) {
      return { value: v, error: `Must be at least ${rule.min}.` };
    }
    if (rule.max != null && v > rule.max) {
      return { value: v, error: `Must be at most ${rule.max}.` };
    }
    return { value: v };
  }

  if (rule.type === "boolean") {
    let v = value;
    if (typeof v === "string") {
      if (["true", "1", "on"].includes(v.toLowerCase())) v = true;
      else if (["false", "0", "off"].includes(v.toLowerCase())) v = false;
    }
    if (typeof v !== "boolean") {
      return { value, error: "Must be a boolean." };
    }
    return { value: v };
  }

  if (rule.type === "date") {
    const v = new Date(value);
    if (Number.isNaN(v.getTime())) {
      return { value, error: "Must be a valid date." };
    }
    return { value: v.toISOString() };
  }

  if (rule.type === "array") {
    if (!Array.isArray(value)) {
      return { value, error: "Must be an array." };
    }
    return { value };
  }

  if (rule.type === "object") {
    if (value == null || typeof value !== "object" || Array.isArray(value)) {
      return { value, error: "Must be an object." };
    }
    return { value };
  }

  return { value };
}

async function checkExists(
  rule: FieldRule,
  value: any,
): Promise<string | undefined> {
  if (!rule.exists) return;
  if (value === null || value === undefined) return;

  const { model, field } = rule.exists;
  const client: any = (prisma as any)[model];
  if (!client || typeof client.findFirst !== "function") {
    return `Model '${String(model)}' is not available on Prisma client.`;
  }

  const record = await client.findFirst({
    where: { [field]: value },
    select: { [field]: true },
  });

  if (!record) {
    return `The selected ${String(model)}.${field} is invalid.`;
  }
}

export async function resolveRequestData<T = any>(
  req: any,
  cfg: CrudConfig,
): Promise<T> {
  const body = await extractBody(req);
  const sanitized: any = {};
  const errors: ValidationErrorItem[] = [];

  const schema = cfg.validation as ValidationSchema;

  for (const [pattern, rule] of Object.entries(schema)) {
    const tokens = parsePath(pattern);
    const matches = collectMatches(body, tokens);

    if (matches.length === 0) {
      if (rule.required) {
        errors.push({
          path: pattern,
          message: "This field is required.",
        });
      }
      continue;
    }

    for (const m of matches) {
      const pathStr = pathToString(m.path);
      let fieldHasError = false;

      if (m.value === undefined) {
        if (rule.required) {
          errors.push({
            path: pathStr,
            message: "This field is required.",
          });
          fieldHasError = true;
        }
      } else {
        const { value: coerced, error } = validatePrimitive(rule, m.value);
        if (error) {
          errors.push({ path: pathStr, message: error });
          fieldHasError = true;
        }

        if (!fieldHasError) {
          const existsError = await checkExists(rule, coerced);
          if (existsError) {
            errors.push({ path: pathStr, message: existsError });
            fieldHasError = true;
          }
        }

        if (!fieldHasError) {
          setDeep(sanitized, m.path, coerced);
        }
      }
    }
  }

  if (errors.length) {
    throw new ValidationError(errors);
  }

  return sanitized as T;
}
