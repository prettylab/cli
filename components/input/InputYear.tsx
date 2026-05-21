import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

export type UncontrolledInputYearProps = {
  value?: Dayjs;
  onChange?: (e: any) => void;
  error?: string | boolean;
};

export default function InputYear({
  value,
  onChange,
  slotProps,
  error,
  ...props
}: UncontrolledInputYearProps & Partial<DatePickerProps>) {
  return (
    <DatePicker
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
      views={["year"]}
      {...props}
    />
  );
}
