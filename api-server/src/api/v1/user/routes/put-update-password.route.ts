import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { responseSchema } from "../../../../interfaces/response.schema";
import { UserController } from "../user.controller";
import { userSchema } from "../user.validator";

export const putUpdatePasswordRoute = (server: Server, controller: UserController, path: string) => {
    server.route({
        method: "PUT",
        path,
        options: {
            tags: ['api'],
            description: 'Update password for current User',
            notes: `Private`,
            response: {
                schema: responseSchema.keys({ data: userSchema }),
                failAction: 'log'
            },
            validate: {
                payload: Joi.object({
                    password: Joi.string().required()
                })
            },
            handler: async (request: Request, reply: ResponseToolkit) => {
                const parsed = request.payload as {
                    password: string
                };
                console.log(parsed);
                console.log(request.auth.credentials);
                return reply.response(await controller.updatePassword(parsed.password, request.auth.credentials.username as string)).code(200);
            }
        }
    });
}
