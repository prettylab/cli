import { Route } from "@prettylab/core/types/Route";
import { ElementType } from "react";

export type MenuEntry = {
  route?: Route;
  icon?: ElementType;
  header?: string;
};
