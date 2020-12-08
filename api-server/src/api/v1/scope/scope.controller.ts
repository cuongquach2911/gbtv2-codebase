import Boom from "@hapi/boom";
import { AuthCredentials } from "@hapi/hapi";
import { inject, injectable } from "tsyringe";
import { ScopeEnum } from "../../../configs/scope.enum";
import { IUserJwt } from "../../../interfaces/IUserJwt";
import { ScopeService } from "../../../services/scope.service";

export interface IScopeController {
    setUserScopes(username: string, scopes: ScopeEnum[]) : Promise<ScopeEnum[] | undefined>;
    getUserScopes(username: string): Promise<ScopeEnum[] | undefined>;
}

@injectable()
export class ScopeController implements IScopeController {
    constructor(
        @inject('IScopeService') private scopeService: ScopeService
    ) { }

    public async setUserScopes(username: string, scopes: ScopeEnum[]) {
        let user; if (!(user = await this.scopeService.updateByUsername(username, scopes))) { throw Boom.notFound('User could not found'); }
        return user;
    }

    public async getUserScopes(username: string) {
        let user; if (!(user = await this.scopeService.fetchByUsername(username))) { throw Boom.notFound('User could not found'); }
        return user;
    }

    public async getAllScopes(credentails: AuthCredentials) {
        console.log(credentails);
        if (!credentails.isRoot && !credentails.scope?.includes(ScopeEnum.manage_user)) { throw Boom.notFound('User is not have permission for showing system scopes'); }
        return await this.scopeService.fetchAllScopes();
    }
}
