export default function isColorExists(theme: any = {}, color: string) {
  return theme.palette[color] !== undefined;
}
