import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { ScopeEnum } from "../../../../configs/scope.enum";
import { IResponse } from "../../../../interfaces/IResponse";
import { IUserJwt } from "../../../../interfaces/IUserJwt";
import { ScopeController } from "../scope.controller";

export const getAllScopesRoute = (server: Server, controller: ScopeController, path: string) => {
    server.route({
        method: "GET",
        path,
        options: {
            tags: ['api'],
            description: 'Get all system scopes',
            notes: `Public`,
            handler: async (request: Request, reply: ResponseToolkit) => {
                return reply.response({
                    statusCode: 200,
                    data: await controller.getAllScopes(request.auth.credentials)
                } as IResponse).code(200);
            }
        }
    });
}
