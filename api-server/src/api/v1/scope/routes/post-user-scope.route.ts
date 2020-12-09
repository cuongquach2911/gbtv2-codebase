import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { ScopeEnum } from "../../../../configs/scope.enum";
import { IResponse } from "../../../../interfaces/IResponse";
import { responseSchema } from "../../../../interfaces/response.schema";
import { authMiddleware } from "../../../../middlewares/auth.middleware";
import { IScope } from "../../../../models/scope.model";
import { ScopeController } from "../scope.controller";

export const postUserScopesRoute = (server: Server, controller: ScopeController, path: string) => {
    server.route({
        method: "POST",
        path,
        options: {
            tags: ['api'],
            description: 'Set scopes for user by username',
            notes: `Public`,
            response: {
                schema: responseSchema.keys({ data: Joi.array().items(Joi.string().valid(...Object.keys(ScopeEnum))) }),
                failAction: 'log'
            },
            validate: {
                params: Joi.object({
                    username: Joi.string().required(),
                }),
                payload: Joi.object({
                    scopes: Joi.array().items(Joi.string().valid(...Object.keys(ScopeEnum)))
                })
            },
            handler: async (request: Request, reply: ResponseToolkit) => {
                const parsedPayload = request.payload as IScope;
                console.log(parsedPayload);
                return reply.response({
                    statusCode: 200,
                    data: await controller.setUserScopes(request.params.username, parsedPayload.scopes)
                } as IResponse).code(200);
            }
        }
    });
}
