import { Ref, forwardRef, ReactNode } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Flex from "@prettylab/core/components/layout/Flex/Flex";

type Props = {
  id: any;
  message: string;
  action: any;
  icon: any;
  color: any;
  children?: ReactNode;
};

export type SnackbarProps = {
  id: any;
  message: string;
  action: any;
  options?: any;
};

function Snackbar(
  { id, message, action, icon, color, children }: Props,
  ref: Ref<unknown> | undefined,
) {
  const theme = useTheme();

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        padding: "16px 20px",
        borderRadius: "2px",
        boxShadow:
          "0px 0px 41px 0px rgba(22, 22, 22, 0.00), 0px 0px 38px 0px rgba(22, 22, 22, 0.01), 0px 0px 32px 0px rgba(22, 22, 22, 0.05), 0px 0px 23px 0px rgba(22, 22, 22, 0.09), 0px 0px 0px 0px rgba(22, 22, 22, 0.10)",
        borderLeft: `3px solid ${color.main}`,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        minWidth: { xs: "200px", sm: "356px" },
      }}
    >
      <Flex sx={{ gap: 1, width: "100%" }} alignCenter>
        {icon && (
          <Flex column sx={{ mt: 0.25 }}>
            {icon}
          </Flex>
        )}
        <Flex column sx={{ gap: 1, width: "100%" }}>
          <Flex between sx={{ gap: 1 }}>
            <Typography sx={{ fontSize: 14 }}>{message}</Typography>
            <Flex center>{action && action(id)}</Flex>
          </Flex>
          {children && <Flex>{children}</Flex>}
        </Flex>
      </Flex>
    </Box>
  );
}

export default forwardRef(Snackbar);
