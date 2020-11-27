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
            description: 'Private',
            notes: `Log in to system and generating JWT token`,
            response: {
                schema: responseSchema,
                failAction: 'log'
            },
            validate: {
                payload: Joi.object({
                    userName: Joi.string(),
                    passWords: Joi.string()
                })
            },
            handler: async (request: Request, reply: ResponseToolkit) => {
                const payload = request.payload as {
                    userName: string,
                    passWords: string
                };

                const jwt = await controller.signIn({
                    userName: payload.userName,
                    passWords: payload.passWords
                });

                return reply.response({
                    message: 'New JWT token has been generated to your account.',
                    data: jwt
                } as IResponse).code(200);
            }
        }
    });
}
