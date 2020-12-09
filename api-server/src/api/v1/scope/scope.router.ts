import { Server } from "@hapi/hapi";
import { inject, injectable } from "tsyringe";
import { ScopeEnum } from "../../../configs/scope.enum";
import { IRoute } from "../../../interfaces/IRoute";
import { getAllScopesRoute } from "./routes/get-all-scopes.route";
import { getRoleScopesRoute } from "./routes/get-role-scopes.route";
import { getUserScopesRoute } from "./routes/get-user-scopes.route";
import { postUserScopesRoute } from "./routes/post-user-scope.route";
import { ScopeController } from "./scope.controller";

@injectable()
export class ScopeRouter implements IRoute {
    private prefixSingle = process.env.API_ROUTE_PREFIX + '/scope';
    private prefixPlural = process.env.API_ROUTE_PREFIX + '/scopes';

    constructor(
        @inject('Server') private server: Server,
        @inject('IScopeController') private scopeController: ScopeController
    ) {}    

    attachRoutes() {
        getUserScopesRoute(
            this.server,
            this.scopeController,
            this.prefixPlural + '/user/{username}'
        );

        postUserScopesRoute(
            this.server,
            this.scopeController,
            this.prefixPlural + '/user/{username}'
        );

        getRoleScopesRoute(
            this.server,
            this.scopeController,
            `${this.prefixPlural}/role/{id}`
        );

        getAllScopesRoute(
            this.server,
            this.scopeController,
            this.prefixPlural
        );
    }
}
