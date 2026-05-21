"use client";

import { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <AppRouterCacheProvider
      options={{ enableCssLayer: true, prepend: true, key: "css" }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
        {children}
      </LocalizationProvider>
    </AppRouterCacheProvider>
  );
}
