import type { PrismaClient } from "@prisma/client";

export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "array"
  | "object";

export interface ExistsRule {
  model: keyof PrismaClient;
  field: string;
}

export interface FieldRule {
  type?: FieldType;
  required?: boolean;
  nullable?: boolean;
  min?: number;
  max?: number;
  exists?: ExistsRule;
}

export type ValidationSchema = Record<string, FieldRule>;

export interface ValidationErrorItem {
  path: string;
  message: string;
}

export class ValidationError extends Error {
  public readonly errors: ValidationErrorItem[];

  constructor(errors: ValidationErrorItem[]) {
    super("Validation failed");
    this.name = "ValidationError";
    this.errors = errors;
  }
}
