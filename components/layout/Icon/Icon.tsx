import { IconButtonProps } from "@mui/material";
import IconButton from "@prettylab/core/components/layout/IconButton/IconButton";

export type IconProps = {
  color?: string;
};

export default function Icon({
  color,
  children,
  ...props
}: IconProps & Partial<IconButtonProps>) {
  return (
    <IconButton
      color={color || "primary"}
      disableRipple
      {...props}
      sx={{ p: 0, cursor: "default", ...props.sx }}
    >
      {children}
    </IconButton>
  );
}
