import { Route } from "@prettylab/core/types/Route";
import { ApiRoute } from "@prettylab/core/types/ApiRoute";
import { MessageMeta } from "@prettylab/core/types/MessageMeta";

export type Config = {
  api: {
    message: Record<string, string>;
    matchMessageMeta: Record<string, MessageMeta>;
    messagePath: string;
  };
  core: {
    settings: {
      cookie_name: string;
      defaults?: Record<string, any>;
    };
    routes: {
      protectedRoutes: Record<string, Route | ApiRoute>;
      publicRoutes: Record<string, Route | ApiRoute>;
    };
  };
};
