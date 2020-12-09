import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { responseSchema } from "../../../../interfaces/response.schema";
import { IUser, User } from "../../../../models/user.model";
import { UserController } from "../user.controller";
import { userSchema } from "../user.validator";

export const putUserByUsernameRoute = (server: Server, controller: UserController, path: string) => {
    server.route({
        method: "PUT",
        path,
        options: {
            tags: ['api'],
            description: 'Update exited User by username',
            notes: `Private`,
            response: {
                schema: responseSchema.keys({ data: userSchema }),
                failAction: 'log'
            },
            validate: {
                params: Joi.object({
                    username: Joi.string().required()
                }),
                payload: userSchema.keys({ password: Joi.string().optional() })
            },
            handler: async (request: Request, reply: ResponseToolkit) => {
                return reply.response(await controller.setUserByUsername(
                    request.params.username,
                    request.payload as IUser
                )).code(200);
            }
        }
    });
}
