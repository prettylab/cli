import { forwardRef, Ref } from "react";
import { PiInfo } from "react-icons/pi";

import Snackbar, {
  SnackbarProps,
} from "@prettylab/notify/provider/NotifyProvider/Variants/Snackbar";
import { useTheme } from "@mui/material";
import Link from "next/link";
import Flex from "@prettylab/core/components/layout/Flex/Flex";

function InfoSnackbar(
  { id, message, action, options }: SnackbarProps,
  ref: Ref<unknown> | undefined,
) {
  const theme = useTheme();
  const { link, icon } = options ?? {};

  const linkElement = link ? (
    <Flex sx={{ width: "100%" }}>
      <Link href={link?.href ?? "#"}>{link?.label}</Link>
    </Flex>
  ) : null;

  return (
    <Snackbar
      ref={ref}
      id={id}
      message={message}
      action={action}
      icon={icon || <PiInfo size={20} />}
      color={theme.palette.info}
    >
      {linkElement}
    </Snackbar>
  );
}

export default forwardRef(InfoSnackbar);
