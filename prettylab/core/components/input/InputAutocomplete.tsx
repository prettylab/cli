import { Autocomplete, Skeleton, TextFieldProps } from "@mui/material";
import InputText, {
  UncontrolledInputTextProps,
} from "@prettylab/core/components/input/InputText";
import Flex from "@prettylab/core/components/layout/Flex/Flex";
import { ReactNode, useMemo } from "react";

export type UncontrolledInputAutocompleteSlotProps = {
  textField?: UncontrolledInputTextProps & Partial<TextFieldProps>;
  autocomplete?: any;
  loader?: any;
};

export type UncontrolledInputAutocompleteProps = {
  options: Array<any>;
  label?: string | ReactNode | null;
  error?: boolean;
  slotProps?: UncontrolledInputAutocompleteSlotProps;
  value?: any;
  onChange?: (event: any, value: any, reason: string) => void;
  loading?: boolean;
  size?: "small" | "medium";
  multiple?: boolean;
};

export default function InputAutocomplete({
  options,
  label,
  error,
  slotProps,
  value,
  onChange,
  loading,
  size,
  multiple,
}: UncontrolledInputAutocompleteProps) {
  const selectedValues = useMemo(
    () =>
      options.filter((v) =>
        Array.isArray(value)
          ? value.some((row: any) => row.id === v.id)
          : false,
      ),
    [options, value],
  );

  if (loading) {
    return (
      <Flex {...slotProps?.loader}>
        <Skeleton
          sx={{
            height: size === "small" ? "40px" : "56px",
            width: "100%",
            transform: "scale(1, 1) !important",
          }}
        />
      </Flex>
    );
  }

  return (
    <Autocomplete
      renderInput={(params) => (
        <InputText
          {...params}
          error={error}
          label={label}
          {...slotProps?.textField}
        />
      )}
      getOptionKey={(option: any) => option.id}
      options={options}
      value={
        multiple ? selectedValues : options.find((v) => v.id === value) || null
      }
      onChange={onChange}
      size={size}
      multiple={multiple}
      {...slotProps?.autocomplete}
    />
  );
}
