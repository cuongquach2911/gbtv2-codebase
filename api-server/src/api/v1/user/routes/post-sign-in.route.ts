import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { IResponse } from "../../../../interfaces/IResponse";
import { responseSchema } from "../../../../interfaces/response.schema";
import { UserController } from "../user.controller";

export const postSignInRoute = (server: Server, controller: UserController, path: string) => {
    server.route({
        method: "POST",
        path,
        options: {
            tags: ['api'],
            description: 'Log in to system and generating JWT token',
            notes: `Public`,
            auth: false,
            response: {
                schema: responseSchema,
                failAction: 'log'
            },
            validate: {
                payload: Joi.object({
                    username: Joi.string(),
                    password: Joi.string()
                })
            },
            handler: async (request: Request, reply: ResponseToolkit) => {
                const payload = request.payload as {
                    username: string,
                    password: string
                };

                const jwt = await controller.signIn({
                    username: payload.username,
                    password: payload.password
                });

                return reply.response({
                    message: 'New JWT token has been generated to your account.',
                    data: jwt
                } as IResponse).code(200);
            }
        }
    });
}
