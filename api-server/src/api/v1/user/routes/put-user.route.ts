import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { responseSchema } from "../../../../interfaces/response.schema";
import { IUser, User } from "../../../../models/user.model";
import { UserController } from "../user.controller";
import { userSchema } from "../user.validator";

export const putUserRoute = (server: Server, controller: UserController, path: string) => {
    server.route({
        method: "PUT",
        path,
        options: {
            tags: ['api'],
            description: 'Update current User',
            notes: `Private`,
            response: {
                schema: responseSchema.keys({ data: userSchema }),
                failAction: 'log'
            },
            validate: {
                payload: userSchema.keys({ password: Joi.string().optional() })
            },
            handler: async (request: Request, reply: ResponseToolkit) => {
                return reply.response(await controller.setUserByUsername(
                    request.auth.credentials.username as string,
                    request.payload as IUser
                )).code(200);
            }
        }
    });
}
