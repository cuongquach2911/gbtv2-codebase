import { Server } from "@hapi/hapi";
import { inject, injectable } from "tsyringe";
import { IRoute } from "../../../interfaces/IRoute";
import { RoleController } from "./role.controller";

@injectable()
export class RoleRouter implements IRoute {
    private prefixSingle = process.env.API_ROUTE_PREFIX + '/scope';
    private prefixPlural = process.env.API_ROUTE_PREFIX + '/scopes';

    constructor(
        @inject('Server') private server: Server,
        @inject('IRoleController') private routeController: RoleController
    ) {}    

    attachRoutes() {      
    }
}
