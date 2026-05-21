"use client";

import { TextField, TextFieldProps } from "@mui/material";
import { useRef } from "react";

export type UncontrolledInputNumberProps = {
  value?: string | number;
  onChange?: (e: any) => void;
  error?: string | boolean;
  integer?: boolean;
  decimal?: boolean;
  unsigned?: boolean;
  decimalDigits?: number;
  maxLength?: number;
  showZero?: boolean;
};

export default function InputNumber({
  value,
  onChange,
  error,
  integer,
  decimal,
  unsigned,
  decimalDigits = 2,
  maxLength,
  showZero,
  ...props
}: UncontrolledInputNumberProps & Omit<Partial<TextFieldProps>, "error">) {
  const inputRef = useRef<any>(null);

  return (
    <TextField
      fullWidth
      inputRef={inputRef}
      error={!!error}
      value={showZero ? value : value && value === 0 ? "" : value || ""}
      helperText={typeof error === "string" ? error : ""}
      onChange={(e) => {
        const cursorPosition = e.target.selectionStart ?? 0;
        const originalLength = e.target.value.length;

        let formattedValue = e.target.value;
        formattedValue = formattedValue
          .replace(/(?!^)-/g, "")
          .replace(",", ".")
          .replace(/[^0-9.,-]/g, "");

        if (decimal) {
          formattedValue = formattedValue
            .replace(/[.,](?=.*[.,])/g, "")
            .replace(
              decimal && new RegExp("(\\.\\d{0})(\\d*)"),
              (_, p1, p2) => p1 + p2.slice(0, decimalDigits),
            );
        }

        if (unsigned) {
          formattedValue = formattedValue.replace(/[^0-9.,]/g, "");
        }

        if (integer) {
          formattedValue = formattedValue.replace(".", "");
        }

        if (!integer && !unsigned && !decimal) {
          formattedValue = formattedValue.replace(/(\..*)\./g, "$1");
        }

        e.target.value = formattedValue;

        const newLength = e.target.value.length;
        if (onChange) {
          onChange(e);
        }

        const positionDifference = originalLength - newLength;
        if (inputRef.current) {
          inputRef.current.selectionStart = cursorPosition - positionDifference;
          inputRef.current.selectionEnd = cursorPosition - positionDifference;
        }
      }}
      slotProps={{
        htmlInput: {
          maxLength,
        },
      }}
      {...props}
    />
  );
}
