import { Server } from '@hapi/hapi';
import { UserRouter } from '../api/v1/user/user.router';
import { container } from 'tsyringe';
import { UserService } from '../services/user.service';
import { IRoute } from '../interfaces/IRoute';
import { UserController } from '../api/v1/user/user.controller';
import { ScopeService } from '../services/scope.service';
import { ScopeController } from '../api/v1/scope/scope.controller';
import { ScopeRouter } from '../api/v1/scope/scope.router';

export const bootstrapIoc = (server: Server) => {
    container.register('IUserController', { useClass: UserController });
    container.register('IScopeController', { useClass: ScopeController });
    container.register('IUserService', { useClass: UserService });
    container.register('IScopeService', { useClass: ScopeService });
    container.register('Server', { useValue: server });
}

export const bootstrapRoutes = () => {
    const routes: IRoute[] = [
        container.resolve(UserRouter),
        container.resolve(ScopeRouter),        
    ];
    routes.forEach((route) => route.attachRoutes());
};
