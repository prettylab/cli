"use client";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  SxProps,
} from "@mui/material";

type Option = {
  label: string;
  value: any;
  subLabel?: string;
  disabled?: boolean;
};

export type UncontrolledInputSelectProps = {
  options: Array<Option>;
  value?: any;
  onChange?: (event: any, value: any) => void;
  error?: string | boolean;
  label?: string;
  sx?: SxProps;
};

export default function InputSelect({
  options = [],
  value,
  onChange,
  error,
  label,
  sx,
  ...props
}: UncontrolledInputSelectProps & Omit<Partial<SelectProps>, "error">) {
  return (
    <FormControl fullWidth size={props.size} sx={sx}>
      <InputLabel error={!!error}>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
        error={!!error}
        {...props}
      >
        {options.map((item: any) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {typeof error === "string" && (
        <FormHelperText error={!!error}>{error}</FormHelperText>
      )}
    </FormControl>
  );
}
