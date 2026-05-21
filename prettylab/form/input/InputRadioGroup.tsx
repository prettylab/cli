import { RadioGroupProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import UncontrolledInputRadioGroup, {
  UncontrolledInputRadioGroupProps,
} from "@prettylab/core/components/input/InputRadioGroup";

type InputRadioProps = {
  name: string;
  rules?: any;
  required?: boolean;
};

export default function InputRadioGroup({
  name,
  rules,
  required = false,
  ...props
}: InputRadioProps &
  UncontrolledInputRadioGroupProps &
  Partial<RadioGroupProps>) {
  const { control } = useFormContext();

  const combinedRules = {
    ...rules,
    ...(required && { required: true }),
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={combinedRules}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <UncontrolledInputRadioGroup
          error={error?.message}
          {...props}
          {...field}
        />
      )}
    />
  );
}
