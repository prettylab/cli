import {
  Breakpoint,
  Dialog,
  DialogContent,
  DialogContentProps,
} from "@mui/material";
import { ReactNode } from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  size?: Breakpoint;
};

export default function Modal({
  open,
  children,
  size = "sm",
  handleClose,
  ...props
}: Props & Partial<DialogContentProps>) {
  return (
    <Dialog open={open} maxWidth={size} fullWidth onClose={handleClose}>
      <DialogContent sx={{ p: 3.5 }} {...props}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
