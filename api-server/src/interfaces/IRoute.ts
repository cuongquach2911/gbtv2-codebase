import { Server } from "@hapi/hapi";

export interface IRoute {
  attach(): void;
}
