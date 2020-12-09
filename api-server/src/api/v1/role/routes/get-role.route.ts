import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { IResponse } from "../../../../interfaces/IResponse";
import { responseSchema } from "../../../../interfaces/response.schema";
import { RoleController } from "../role.controller";
import { roleSchema } from "../role.validator";

export const getRoleRoute = (server: Server, controller: RoleController, path: string) => {
    server.route({
        method: "GET",
        path,
        options: {
            tags: ['api'],
            description: 'Get role by Role Id',
            notes: `Private`,
            response: {
                schema: responseSchema.keys({ data: roleSchema }),
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
                    data: await controller.getRole(request.params.id)
                } as IResponse).code(200);
            }
        }
    });
}
