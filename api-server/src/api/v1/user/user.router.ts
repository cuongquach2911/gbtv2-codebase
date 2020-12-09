import { Server } from "@hapi/hapi";
import { inject, injectable } from "tsyringe";
import { IRoute } from "../../../interfaces/IRoute";
import { getUserByUserNameRoute } from "./routes/get-user-by-username.route";
import { getUsersRoute } from "./routes/get-users.route";
import { postSignInRoute } from "./routes/post-sign-in.route";
import { postUserRoute } from "./routes/post-user.route";
import { putUpdatePasswordRoute } from "./routes/put-update-password.route";
import { putUserByUsernameRoute } from "./routes/put-user-by-username.route";
import { putUserRoute } from "./routes/put-user.route";
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
            this.prefixSingle + '/{username}'
        );        

        postSignInRoute(
            this.server,
            this.userController,
            this.prefixSingle + '/signin'
        );

        putUpdatePasswordRoute(
            this.server,
            this.userController,
            `${this.prefixSingle}/password`
        );

        putUserByUsernameRoute(
            this.server,
            this.userController,
            `${this.prefixSingle}/{username}`
        );

        putUserRoute(
            this.server,
            this.userController,
            this.prefixSingle
        );
    }
}
