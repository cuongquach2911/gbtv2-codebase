import { Server } from '@hapi/hapi';
import { UserRouter } from '../api/v1/user/user.router';
import { container } from 'tsyringe';
import { UserService } from '../services/user.service';
import { IRoute } from '../interfaces/IRoute';

export const autoLoadIoc = () => {
    container.register('IUserService', { useClass: UserService });
}

export const autoLoadRoutes = (server: Server) => {
    const routes: IRoute[] = [
        new UserRouter(server)
    ];
    routes.forEach((route) => route.attach());
};
