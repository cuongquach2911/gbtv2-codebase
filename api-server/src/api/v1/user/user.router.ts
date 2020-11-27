import { Server } from "@hapi/hapi";
import { inject, injectable } from "tsyringe";
import { IRoute } from "../../../interfaces/IRoute";
import { getUserByUserNameRoute } from "./routes/getUserByUserName.route";
import { getUsersRoute } from "./routes/getUsers.route";
import { postSignInRoute } from "./routes/postSignIn.route";
import { postUserRoute } from "./routes/postUser.route";
import { UserController } from "./user.controller";

@injectable()
export class UserRouter implements IRoute {
    private prefixSingle = process.env.API_ROUTE_PREFIX + '/user';
    private prefixPlural = process.env.API_ROUTE_PREFIX + '/users';

    constructor(
        @inject('Server') private server: Server,
        @inject('IUserController') private userController: UserController
    ) {}    

    attachRoutes() {
        getUsersRoute(
            this.server,
            this.userController,
            this.prefixPlural
        );

        postUserRoute(
            this.server,
            this.userController,
            this.prefixSingle
        );

        getUserByUserNameRoute(
            this.server,
            this.userController,
            this.prefixSingle + '/{userName}'
        );        

        postSignInRoute(
            this.server,
            this.userController,
            this.prefixSingle + '/signin'
        );
    }
}
