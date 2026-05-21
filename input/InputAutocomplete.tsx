import { UncontrolledInputAutocompleteProps } from "@prettylab/core/components/input/InputAutocomplete";
import { AutocompleteProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { validationRequired } from "@prettylab/core/utils/form/validation";
import UncontrolledInputAutocomplete from "@prettylab/core/components/input/InputAutocomplete";

type InputAutocompleteProps = {
  name: string;
  rules?: any;
  required?: boolean;
};

export default function InputAutocomplete({
  name,
  rules,
  required,
  ...props
}: InputAutocompleteProps &
  UncontrolledInputAutocompleteProps &
  Partial<AutocompleteProps<any, any, any, any>>) {
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
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <UncontrolledInputAutocomplete
          {...field}
          {...props}
          error={!!error}
          onChange={(_, value) => {
            if (field.onChange) {
              field.onChange(value?.id || value);
            }
          }}
        />
      )}
    />
  );
}
