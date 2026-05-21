import { Controller, useFormContext } from "react-hook-form";
import { validationRequired } from "@prettylab/core/utils/form/validation";

import { DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import UncontrolledInputYear, {
  UncontrolledInputYearProps,
} from "@prettylab/core/components/input/InputYear";

type InputYearProps = {
  name: string;
  rules?: any;
  required?: boolean;
};

export default function InputYear({
  name,
  rules = {},
  required = false,
  ...props
}: InputYearProps & UncontrolledInputYearProps & Partial<DatePickerProps>) {
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
        <UncontrolledInputYear
          {...field}
          error={error?.message}
          {...props}
          slotProps={{
            ...props?.slotProps,
            textField: {
              ...props?.slotProps?.textField,
              required,
            },
          }}
        />
      )}
    />
  );
}
