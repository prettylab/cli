"use client";

import { SwitchProps as MuiSwitchProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { validationRequired } from "@prettylab/core/utils/form/validation";
import UncontrolledInputSwitch, {
  UncontrolledInputSwitchProps,
} from "@prettylab/core/components/input/InputSwitch";

type InputSwitchProps = {
  name: string;
  rules?: any;
  required?: boolean;
};

export default function InputSwitch({
  name,
  rules = {},
  required = false,
  ...props
}: InputSwitchProps & UncontrolledInputSwitchProps & Partial<MuiSwitchProps>) {
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
        <UncontrolledInputSwitch
          {...field}
          checked={field.value || false}
          error={error?.message}
          required={required}
          {...props}
        />
      )}
    />
  );
}
