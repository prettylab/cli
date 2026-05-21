"use client";

import { SelectProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { validationRequired } from "@prettylab/core/utils/form/validation";
import UncontrolledInputSelect, {
  UncontrolledInputSelectProps,
} from "@prettylab/core/components/input/InputSelect";

type InputSelectProps = {
  name: string;
  rules?: any;
  required?: boolean;
};

export default function InputSelect({
  name,
  rules = {},
  required = false,
  ...props
}: InputSelectProps & UncontrolledInputSelectProps & Partial<SelectProps>) {
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
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <UncontrolledInputSelect
          {...field}
          error={error?.message}
          required={required}
          {...props}
        />
      )}
    />
  );
}
