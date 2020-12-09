import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { ScopeEnum } from "../../../../configs/scope.enum";
import { IResponse } from "../../../../interfaces/IResponse";
import { responseSchema } from "../../../../interfaces/response.schema";
import { ScopeController } from "../scope.controller";

export const getRoleScopesRoute = (server: Server, controller: ScopeController, path: string) => {
    server.route({
        method: "GET",
        path,
        options: {
            tags: ['api'],
            description: 'Get all scopes by Role Id',
            notes: `Public`,
            response: {
                schema: responseSchema.keys({ data: Joi.array().items().valid({ ...Object.keys(ScopeEnum) }) }),
                failAction: 'log'
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().required()
                })
            },
            handler: async (request: Request, reply: ResponseToolkit) => {
                return reply.response({
                    statusCode: 200,
                    data: await controller.getRoleScopes(request.params.id)
                } as IResponse).code(200);
            }
        }
    });
}
