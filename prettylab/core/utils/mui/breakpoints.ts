import { useMediaQuery } from "@mui/system";
import { Breakpoint, useTheme } from "@mui/material";

export const useBreakpointDown = (breakpoint: Breakpoint) => {
  return useMediaQuery(useTheme().breakpoints.down(breakpoint));
};

export const useBreakpointUp = (breakpoint: Breakpoint) => {
  return useMediaQuery(useTheme().breakpoints.up(breakpoint));
};

export const useBreakpointBetween = (
  startBreakpoint: Breakpoint,
  endBreakpoint: Breakpoint,
) => {
  return useMediaQuery(
    useTheme().breakpoints.between(startBreakpoint, endBreakpoint),
  );
};

export const useBreakpointOnly = (breakpoint: Breakpoint) => {
  return useMediaQuery(useTheme().breakpoints.only(breakpoint));
};
