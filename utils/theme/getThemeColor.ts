import isColorExists from "./isColorExists";

export default function getThemeColor(theme: any = {}, color: string) {
  return isColorExists(theme, color) ? theme.palette[color].main : null;
}
