import dayjs, { Dayjs } from "dayjs";
import { TimePicker, TimePickerProps } from "@mui/x-date-pickers";

export type UncontrolledInputTimeProps = {
  value?: Dayjs;
  onChange?: (e: any) => void;
  error?: string | boolean;
};

export default function InputTime({
  value,
  onChange,
  slotProps,
  error,
  ...props
}: UncontrolledInputTimeProps & Partial<TimePickerProps>) {
  return (
    <TimePicker
      value={value ? dayjs(value) : null}
      onChange={onChange}
      slotProps={{
        ...slotProps,
        textField: {
          ...slotProps?.textField,
          helperText: typeof error === "string" ? error : "",
          error: !!error,
          fullWidth: true,
        },
      }}
      {...props}
    />
  );
}
