export type MessageMeta = {
  code: number;
  success: boolean;
  notifyWariant: "success" | "error" | "warning" | "info";
};