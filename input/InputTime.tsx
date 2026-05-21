import { Controller, useFormContext } from "react-hook-form";
import { validationRequired } from "@prettylab/core/utils/form/validation";
import UncontrolledInputTime from "@prettylab/core/components/input/InputTime";
import { UncontrolledInputTimeProps } from "@prettylab/core/components/input/InputTime";
import { TimePickerProps } from "@mui/x-date-pickers";

type InputTimeProps = {
  name: string;
  rules?: any;
  required?: boolean;
};

export default function InputTime({
  name,
  rules = {},
  required = false,
  ...props
}: InputTimeProps & UncontrolledInputTimeProps & Partial<TimePickerProps>) {
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
        <UncontrolledInputTime
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
