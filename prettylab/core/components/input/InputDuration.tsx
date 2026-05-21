"use client";

import { TimeField, TimeFieldProps } from "@mui/x-date-pickers";
import { PickerValue } from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";

export type UncontrolledInputDurationProps = {
  value?: PickerValue;
  onChange?: (e: any) => void;
  error?: string | boolean;
};

export default function InputDuration({
  value,
  onChange,
  error,
  ...props
}: UncontrolledInputDurationProps & Omit<Partial<TimeFieldProps>, "error">) {
  return (
    <TimeField
      error={!!error}
      value={value}
      format="mm:ss"
      helperText={typeof error === "string" ? error : ""}
      defaultValue={dayjs().minute(0).second(0)}
      onChange={onChange}
      {...props}
    />
  );
}
