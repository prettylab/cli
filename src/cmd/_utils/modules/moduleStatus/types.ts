export type ModuleStatus = Promise<{
  name: string;
  prefix: string;
  remote: string;
  branch: string;
  dirty: boolean;
  ahead: number;
  behind: number;
}>;
