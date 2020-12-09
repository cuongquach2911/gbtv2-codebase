import Boom from "@hapi/boom";
import { AuthCredentials } from "@hapi/hapi";
import { inject, injectable } from "tsyringe";
import { ScopeEnum } from "../../../configs/scope.enum";
import { IRole, Role } from "../../../models/role.model";
import { RoleService } from "../../../services/role.service";
import { ScopeService } from "../../../services/scope.service";

export interface IRoleController {
    upsert(role: IRole): Promise<Role>;
    delete(id: number): Promise<Boolean>;
    getRoles(): Promise<Role[]>;
    getRole(id: number): Promise<Role>;
}

@injectable()
export class RoleController implements IRoleController {
    constructor(
        @inject('IRoleService') private roleService: RoleService
    ) { }

    public async upsert(role: IRole) {
        return await this.roleService.upsert(role);
    }

    public async delete(id: number): Promise<Boolean> {
        const role = await this.roleService.fetchById(id);
        if (!role) { throw Boom.notFound('Can not found your role !'); }
        role.active = false; this.roleService.upsert(role);
        return true;
    }

    public async getRoles(): Promise<Role[]> {
        return await this.roleService.fetchAll();
    }

    public async getRole(id: number): Promise<Role> {
        const role = await this.roleService.fetchById(id);
        if (!role) throw Boom.notFound(`Role with id [${id}] is not founded`);
        return role;
    }
}
