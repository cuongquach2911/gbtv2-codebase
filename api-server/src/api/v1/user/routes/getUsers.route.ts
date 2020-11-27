import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { convertPage } from "../../../../helpers/page.helper";
import { countAndRecordsSchema } from "../../../../interfaces/countAndRecords.schema";
import { ICountAndRecords } from "../../../../interfaces/ICountAndRecords";
import { UserController } from "../user.controller";
import { userSchema } from "../user.validator";

export const getUsersRoute = (server: Server, controller: UserController, path: string) => {
    server.route({
        method: "GET",
        path,
        options: {
            tags: ['api'],
            description: 'Public',
            notes: `Get Users`,
            response: {
                schema: countAndRecordsSchema.data.keys({ rows: Joi.array().items(userSchema) }),
                failAction: 'log'
            },
            validate: {
                query: Joi.object({
                    name: Joi.string().optional(),
                    page: Joi.number().default(1)
                })
            },
            handler: async (request: Request, reply: ResponseToolkit) => {
                const results = await controller.getUsers(null, convertPage(request.query.page));
                return reply.response({
                    statusCode: 200,
                    data: {
                        count: results.count,
                        rows: results.data
                    }
                } as ICountAndRecords).code(200);
            }
        }
    });
}
