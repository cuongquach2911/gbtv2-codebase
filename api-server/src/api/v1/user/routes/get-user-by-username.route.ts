import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { IResponse } from "../../../../interfaces/IResponse";
import { responseSchema } from "../../../../interfaces/response.schema";
import { authMiddleware } from "../../../../middlewares/auth.middleware";
import { UserController } from "../user.controller";
import { userSchema } from "../user.validator";

export const getUserByUserNameRoute = (server: Server, controller: UserController, path: string) => {
    server.route({
        method: "GET",
        path,
        options: {
            tags: ['api'],
            description: 'Public api',
            notes: `Get User's detail`,
            response: {
                schema: responseSchema.keys({ data: userSchema }),
                failAction: 'log'
            },
            validate: {
                params: Joi.object({
                    username: Joi.string()
                }),
            },
            handler: async (request: Request, reply: ResponseToolkit) => {
                return reply.response({
                    statusCode: 200,
                    data: await controller.getByUsername(request.params.username)
                } as IResponse).code(200);
            }
        }
    });
}
