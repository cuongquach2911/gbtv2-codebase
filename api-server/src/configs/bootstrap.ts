import { Server } from '@hapi/hapi';
import { UserRouter } from '../api/v1/user/user.router';
import { container } from 'tsyringe';
import { UserService } from '../services/user.service';
import { IRoute } from '../interfaces/IRoute';
import { UserController } from '../api/v1/user/user.controller';

export const bootstrapIoc = (server: Server) => {
    container.register('IUserController', { useClass: UserController });
    container.register('IUserService', { useClass: UserService });
    container.register('Server', { useValue: server });
}

export const bootstrapRoutes = () => {
    const routes: IRoute[] = [
        container.resolve(UserRouter)
    ];
    routes.forEach((route) => route.attachRoutes());
};
