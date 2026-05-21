"use client";

import { TextField, TextFieldProps } from "@mui/material";

export type UncontrolledInputTextProps = {
  value?: string;
  onChange?: (e: any) => void;
  error?: string | boolean;
};

export default function InputText({
  value,
  onChange,
  error,
  ...props
}: UncontrolledInputTextProps & Omit<Partial<TextFieldProps>, "error">) {
  return (
    <TextField
      fullWidth
      error={!!error}
      value={value || ""}
      helperText={typeof error === "string" ? error : ""}
      onChange={onChange}
      {...props}
    />
  );
}
