"use client";

import { Controller, useFormContext } from "react-hook-form";
import { validationRequired } from "@prettylab/core/utils/form/validation";
import UncontrolledInputDuration, {
  UncontrolledInputDurationProps,
} from "@prettylab/core/components/input/InputDuration";
import { TimeFieldProps } from "@mui/x-date-pickers";

type InputDurationProps = {
  name: string;
  rules?: any;
  required?: boolean;
};

export default function InputDuration({
  name,
  rules = {},
  required = false,
  ...props
}: InputDurationProps &
  UncontrolledInputDurationProps &
  Partial<TimeFieldProps>) {
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
        <UncontrolledInputDuration
          {...field}
          error={error?.message}
          required={required}
          {...props}
        />
      )}
    />
  );
}
