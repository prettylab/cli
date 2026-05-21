"use client";

import {
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
  FormHelperTextProps,
  Switch,
  SwitchProps as MuiSwitchProps,
} from "@mui/material";
import Flex, { FlexProps } from "@prettylab/core/components/layout/Flex/Flex";

type SwitchSlotProps = {
  container?: FlexProps;
  formControlLabel?: FormControlLabelProps;
  formHelperText?: FormHelperTextProps;
};

export type UncontrolledInputSwitchProps = {
  label?: string;
  checked?: boolean;
  onChange?: (event: any, checked: boolean) => void;
  error?: string | boolean;
  slotProps?: SwitchSlotProps;
};

export default function InputSwitch({
  label,
  checked,
  onChange,
  slotProps,
  error,
  ...props
}: UncontrolledInputSwitchProps & Partial<MuiSwitchProps>) {
  return (
    <Flex column {...slotProps?.container}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={onChange} {...props} />}
        label={label}
        {...slotProps?.formControlLabel}
      />
      {typeof error === "string" && (
        <FormHelperText error {...slotProps?.formHelperText}>
          {error}
        </FormHelperText>
      )}
    </Flex>
  );
}
