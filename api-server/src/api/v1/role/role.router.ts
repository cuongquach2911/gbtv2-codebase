import { Server } from "@hapi/hapi";
import { inject, injectable } from "tsyringe";
import { IRoute } from "../../../interfaces/IRoute";
import { RoleController } from "./role.controller";
import { getRoleRoute } from "./routes/get-role.route";
import { getRolesRoute } from "./routes/get-roles.route";
import { postRoleRoute } from "./routes/post-role.route";
import { putRoleRoute } from "./routes/put-role.route";

@injectable()
export class RoleRouter implements IRoute {
    private prefixSingle = process.env.API_ROUTE_PREFIX + '/role';
    private prefixPlural = process.env.API_ROUTE_PREFIX + '/roles';

    constructor(
        @inject('Server') private server: Server,
        @inject('IRoleController') private roleController: RoleController
    ) {}    

    attachRoutes() {
        postRoleRoute(
            this.server,
            this.roleController,
            this.prefixSingle
        );

        getRoleRoute(
            this.server,
            this.roleController,
            `${this.prefixSingle}/{id}`
        )

        getRolesRoute(
            this.server,
            this.roleController,
            this.prefixPlural
        );

        putRoleRoute(
            this.server,
            this.roleController,
            this.prefixSingle
        );
    }
}
