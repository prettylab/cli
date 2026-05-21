"use client";

import { ReactNode, useRef } from "react";
import { SnackbarProvider } from "notistack";
import DefaultSnackbar from "@prettylab/notify/provider/NotifyProvider/Variants/DefaultSnackbar";
import SuccessSnackbar from "@prettylab/notify/provider/NotifyProvider/Variants/SuccessSnackbar";
import ErrorSnackbar from "@prettylab/notify/provider/NotifyProvider/Variants/ErrorSnackbar";
import WarningSnackbar from "@prettylab/notify/provider/NotifyProvider/Variants/WarningSnackbar";
import InfoSnackbar from "@prettylab/notify/provider/NotifyProvider/Variants/InfoSnackbar";
import { MdClose } from "react-icons/md";
import Flex from "@prettylab/core/components/layout/Flex/Flex";

type Props = {
  children: ReactNode;
};

export default function NotifyProvider({ children }: Props) {
  const ref: any = useRef(null);

  return (
    <SnackbarProvider
      ref={ref}
      Components={{
        default: DefaultSnackbar,
        success: SuccessSnackbar,
        error: ErrorSnackbar,
        warning: WarningSnackbar,
        info: InfoSnackbar,
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      maxSnack={20}
      autoHideDuration={8000}
      action={(key) => (
        <Flex alignCenter>
          <MdClose
            size={15}
            style={{ cursor: "pointer" }}
            onClick={() => ref.current.closeSnackbar(key)}
          />
        </Flex>
      )}
    >
      {children}
    </SnackbarProvider>
  );
}
