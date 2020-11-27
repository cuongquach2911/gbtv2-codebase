import { Server } from "@hapi/hapi";

export interface IRoute {
    attachRoutes(): void;
}
