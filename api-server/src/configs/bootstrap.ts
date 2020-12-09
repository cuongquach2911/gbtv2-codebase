import { Server } from '@hapi/hapi';
import { UserRouter } from '../api/v1/user/user.router';
import { container } from 'tsyringe';
import { UserService } from '../services/user.service';
import { IRoute } from '../interfaces/IRoute';
import { UserController } from '../api/v1/user/user.controller';
import { ScopeService } from '../services/scope.service';
import { ScopeController } from '../api/v1/scope/scope.controller';
import { ScopeRouter } from '../api/v1/scope/scope.router';
import { RoleController } from '../api/v1/role/role.controller';
import { RoleService } from '../services/role.service';
import { RoleRouter } from '../api/v1/role/role.router';

export const bootstrapIoc = (server: Server) => {
    container.register('IUserController', { useClass: UserController });
    container.register('IScopeController', { useClass: ScopeController });
    container.register('IRoleController', { useClass: RoleController });

    container.register('IUserService', { useClass: UserService });
    container.register('IScopeService', { useClass: ScopeService });
    container.register('IRoleService', { useClass: RoleService });

    container.register('Server', { useValue: server });
}

export const bootstrapRoutes = () => {
    const routes: IRoute[] = [
        container.resolve(UserRouter),
        container.resolve(ScopeRouter),
        container.resolve(RoleRouter)
    ];
    routes.forEach((route) => route.attachRoutes());
};
