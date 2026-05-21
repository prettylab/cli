"use client";

import { TextFieldProps } from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";
import { validationRequired } from "@prettylab/core/utils/form/validation";
import UncontrolledInputNumber, {
  UncontrolledInputNumberProps,
} from "@prettylab/core/components/input/InputNumber";

type InputNumberProps = {
  name: string;
  rules?: any;
  required?: boolean;
};

export default function InputNumber({
  name,
  rules = {},
  required = false,
  ...props
}: InputNumberProps & UncontrolledInputNumberProps & Partial<TextFieldProps>) {
  const { control } = useFormContext();

  const combinedRules = {
    ...rules,
    ...(required && validationRequired),
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={combinedRules}
      render={({ field, fieldState: { error } }) => (
        <UncontrolledInputNumber
          {...field}
          error={error?.message}
          required={required}
          {...props}
        />
      )}
    />
  );
}
