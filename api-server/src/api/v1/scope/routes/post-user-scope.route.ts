import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { ScopeEnum } from "../../../../configs/scope.enum";
import { IResponse } from "../../../../interfaces/IResponse";
import { authMiddleware } from "../../../../middlewares/auth.middleware";
import { ScopeController } from "../scope.controller";
import { IScope } from "../scope.router";

export const postUserScopesRoute = (server: Server, controller: ScopeController, path: string) => {
    server.route({
        method: "POST",
        path,
        options: {
            tags: ['api'],
            description: 'Public',
            notes: `Set scopes for user by username`,
            response: {
                schema: Joi.array().items().valid({ ...Object.keys(ScopeEnum) }),
                failAction: 'log'
            },
            validate: {
                params: Joi.object({
                    username: Joi.string().required(),
                }),
                payload: Joi.object({
                    scopes: Joi.array().items().valid({ ...Object.keys(ScopeEnum) })
                })
            },
            handler: async (request: Request, reply: ResponseToolkit) => {
                const parsedPayload = request.payload as IScope;
                return reply.response({
                    statusCode: 200,
                    data: await controller.setUserScopes(request.params.username, parsedPayload.scopes)
                } as IResponse).code(200);
            }
        }
    });
}
