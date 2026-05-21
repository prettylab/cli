import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

export interface FlexProps extends BoxProps {
  children?: ReactNode;
  wrap?: boolean;
  alignStart?: boolean;
  alignCenter?: boolean;
  between?: boolean;
  around?: boolean;
  center?: boolean;
  end?: boolean;
  column?: boolean;
  sx?: any;
}

export default function Flex({
  children,
  wrap,
  alignStart,
  alignCenter,
  between,
  around,
  center,
  end,
  column,
  sx,
  ...props
}: FlexProps) {
  const additionalSx = {
    ...(wrap && { flexWrap: "wrap" }),
    ...(alignStart && { alignItems: "flex-start" }),
    ...(alignCenter && { alignItems: "center" }),
    ...(column && { flexDirection: "column" }),
    ...(between && { justifyContent: "space-between" }),
    ...(around && { justifyContent: "space-around" }),
    ...(center && { justifyContent: "center" }),
    ...(end && { justifyContent: "flex-end" }),
  };

  return (
    <Box sx={{ display: "flex", ...additionalSx, ...sx }} {...props}>
      {children}
    </Box>
  );
}
