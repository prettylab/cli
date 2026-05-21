import { Controller, useFormContext } from "react-hook-form";
import { UncontrolledInputApiAutocompleteProps } from "@prettylab/api/components/input/InputApiAutocomplete";
import UncontrolledInputApiAutocomplete from "@prettylab/api/components/input/InputApiAutocomplete";

type InputApiAutocompleteProps = {
  name: string;
  rules?: any;
  onChange?: (e: any) => void;
  required?: boolean;
  multiple?: boolean;
};

export default function InputApiAutocomplete({
  name,
  rules,
  onChange,
  required = false,
  multiple,
  ...props
}: InputApiAutocompleteProps & UncontrolledInputApiAutocompleteProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        //@ts-ignore
        <UncontrolledInputApiAutocomplete
          {...field}
          fullWidth
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value || ""
          }
          error={!!error}
          onChange={(_: any, value: any) => {
            field.onChange(value);

            if (onChange) {
              onChange(value);
            }
          }}
          multiple={multiple}
          {...props}
          slotProps={{
            textField: {
              required: required,
              helperText: error?.message,
              error: !!error?.message,
            },
            ...props?.slotProps,
          }}
        />
      )}
    />
  );
}
