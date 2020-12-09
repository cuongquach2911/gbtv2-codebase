import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { ScopeEnum } from "../../../../configs/scope.enum";
import { IResponse } from "../../../../interfaces/IResponse";
import { responseSchema } from "../../../../interfaces/response.schema";
import { IRole, Role } from "../../../../models/role.model";
import { RoleController } from "../role.controller";
import { roleSchema } from "../role.validator";

export const putRoleRoute = (server: Server, controller: RoleController, path: string) => {
    server.route({
        method: "PUT",
        path,
        options: {
            tags: ['api'],
            description: 'Update existed role',
            notes: `Private`,
            response: {
                schema: responseSchema.keys({ data: roleSchema }),
                failAction: 'log'
            },
            validate: {
                payload: roleSchema
            },
            handler: async (request: Request, reply: ResponseToolkit) => {
                return reply.response({
                    statusCode: 200,
                    data: await controller.upsert(request.payload as IRole)
                } as IResponse).code(200);
            }
        }
    });
}
