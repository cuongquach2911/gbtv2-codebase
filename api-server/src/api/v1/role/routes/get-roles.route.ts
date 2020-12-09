import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { IResponse } from "../../../../interfaces/IResponse";
import { responseSchema } from "../../../../interfaces/response.schema";
import { RoleController } from "../role.controller";
import { roleSchema } from "../role.validator";

export const getRolesRoute = (server: Server, controller: RoleController, path: string) => {
    server.route({
        method: "GET",
        path,
        options: {
            tags: ['api'],
            description: 'Get all roles',
            notes: `Private`,
            response: {
                schema: responseSchema.keys({ data: Joi.array().items(roleSchema) }),
                failAction: 'log'
            },
            handler: async (request: Request, reply: ResponseToolkit) => {
                return reply.response({
                    statusCode: 200,
                    data: await controller.getRoles()
                } as IResponse).code(200);
            }
        }
    });
}
