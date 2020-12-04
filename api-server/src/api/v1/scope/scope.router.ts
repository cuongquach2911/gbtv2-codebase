import { Server } from "@hapi/hapi";
import { inject, injectable } from "tsyringe";
import { ScopeEnum } from "../../../configs/scope.enum";
import { IRoute } from "../../../interfaces/IRoute";
import { getAllScopes } from "./routes/get-all-scopes.route";
import { getUserScopesRoute } from "./routes/get-user-scopes.route";
import { postUserScopesRoute } from "./routes/post-user-scope.route";
import { ScopeController } from "./scope.controller";

export interface IScope {
    scopes: ScopeEnum[]
}

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

        getAllScopes(
            this.server,
            this.scopeController,
            this.prefixPlural
        );
    }
}
