import Boom from "@hapi/boom";
import { AuthCredentials } from "@hapi/hapi";
import { inject, injectable } from "tsyringe";
import { ScopeEnum } from "../../../configs/scope.enum";
import { Role } from "../../../models/role.model";
import { RoleService } from "../../../services/role.service";
import { ScopeService } from "../../../services/scope.service";

export interface IRoleController {
    upsert(role: Role): Promise<Role>;
    delete(id: number): Promise<Boolean>;
}

@injectable()
export class RoleController implements IRoleController {
    constructor(
        @inject('IRoleService') private roleService: RoleService
    ) { }

    public async upsert(role: Role) {
        return await this.roleService.upsert(role);
    }

    public async delete(id: number): Promise<Boolean> {
        const role = await this.roleService.fetchById(id);
        if (!role) { throw Boom.notFound('Can not found your role !'); }
        role.active = false; this.roleService.upsert(role);
        return true;
    }
}
