import { ResponseToolkit, Request, Server } from "@hapi/hapi";
import Joi from "joi";
import { container } from "tsyringe";
import { IRoute } from "../../../interfaces/IRoute";
import { IUser, User } from "../../../models/user";
import { UserController } from "./user-controller";
import { userSchema } from "./user-validator";

interface IUserRouter {
  getUserByUsername(): void;
  postUser(): void;
}

export class UserRouter implements IRoute, IUserRouter {  
  private userController = container.resolve(UserController);
  private prefixSingle = '/user';
  private prefixPlural = '/users';
  private _server: Server;

  constructor(server: Server) {
    this._server = server;
  }

  getUserByUsername(): void {
    this._server.route({
      method: "GET",
      path: this.prefixSingle + '/{userName}',
      options: {
        tags: ['api'],
        description: 'Public',
        notes: `Get User's detail`,
        response: {
          //schema: userSchema
        },
        validate: {
          params: Joi.object({
            userName: Joi.string()
          }),
        },
        handler: async (request: Request, reply: ResponseToolkit) => {
          const user: IUser = await this.userController.getByUsername(request.params.userName);
          if (!user) { return reply.response().code(404); }
          return reply.response(user).code(200);
        }
      }
    });
  }

  postUser(): void {
    this._server.route({
      method: "POST",
      path: this.prefixSingle,
      options: {
        tags: ['api'],
        description: 'Private',
        notes: `Create new User`,
        response: {
          //schema: userSchema
        },
        validate: {
          payload: userSchema.keys({ passWords: Joi.string().required() })
        },
        handler: async (request: Request, reply: ResponseToolkit) => {
          const user = request.payload as User;
          const newUser = await this.userController.create(user);          
          if (!user) { return reply.response().code(404); }
          return reply.response(newUser).code(200);
        }
      }
    });
  }

  attach() {    
    this.getUserByUsername();
    this.postUser();
  }
}
