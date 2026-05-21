"use client";

import { TextFieldProps } from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";
import { validationRequired } from "@prettylab/core/utils/form/validation";
import UncontrolledInputText, {
  UncontrolledInputTextProps,
} from "@prettylab/core/components/input/InputText";

type InputTextProps = {
  name: string;
  rules?: any;
  required?: boolean;
};

export default function InputText({
  name,
  rules = {},
  required = false,
  ...props
}: InputTextProps & UncontrolledInputTextProps & Partial<TextFieldProps>) {
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
        <UncontrolledInputText
          {...field}
          error={error?.message}
          required={required}
          {...props}
        />
      )}
    />
  );
}
