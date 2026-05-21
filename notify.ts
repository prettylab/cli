import { OptionsWithExtraProps } from "notistack";
import isServer from "@prettylab/core/utils/ssr/isServer";

export const notify = async (
  message: string,
  options?: OptionsWithExtraProps<any>,
) => {
  if (isServer()) return;

  const { enqueueSnackbar } = await import("notistack");
  enqueueSnackbar(message, { variant: "default", ...options });
};
