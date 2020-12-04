import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { responseSchema } from "../../../../interfaces/response.schema";
import { User } from "../../../../models/user.model";
import { UserController } from "../user.controller";
import { userSchema } from "../user.validator";

export const postUserRoute = (server: Server, controller: UserController, path: string) => {
    server.route({
        method: "POST",
        path,
        options: {
            tags: ['api'],
            description: 'Public api',
            notes: `Create new User`,
            auth: false,
            response: {
                schema: responseSchema.keys({ data: userSchema }),
                failAction: 'log'
            },
            validate: {
                payload: userSchema.keys({ passwords: Joi.string().required() })
            },
            handler: async (request: Request, reply: ResponseToolkit) => {
                return reply.response(await controller.create(request.payload as User)).code(200);
            }
        }
    });
}
