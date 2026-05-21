import { ReactNode } from "react";
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  Tooltip,
  TooltipProps,
} from "@mui/material";
import Link, { LinkProps } from "next/link";

export type IconButtonProps = {
  children?: ReactNode;
  label?: any;
  href?: string;
  slotProps?: IconButtonSlotProps;
};

export type IconButtonSlotProps = {
  tooltip?: TooltipProps;
  link?: LinkProps;
};

export default function IconButton({
  children,
  label,
  href,
  slotProps,
  ...props
}: IconButtonProps & Partial<MuiIconButtonProps>) {
  let iconButton = <MuiIconButton {...props}>{children}</MuiIconButton>;

  if (label) {
    iconButton = (
      <Tooltip title={label} {...slotProps?.tooltip}>
        {iconButton}
      </Tooltip>
    );
  }

  if (href) {
    iconButton = (
      <Link href={href} {...slotProps?.link}>
        {iconButton}
      </Link>
    );
  }

  return iconButton;
}
