import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { IResponse } from "../../../../interfaces/IResponse";
import { responseSchema } from "../../../../interfaces/response.schema";
import { authMiddleware } from "../../../../middlewares/auth.middleware";
import { IUser } from "../../../../models/user.model";
import { UserController } from "../user.controller";
import { userSchema } from "../user.validator";

export const getUserByUserNameRoute = (server: Server, controller: UserController, path: string) => {
    server.route({
        method: "GET",
        path,
        options: {
            tags: ['api'],
            description: 'Public',
            notes: `Get User's detail`,
            pre: [
                { method: authMiddleware, assign: 'jwtUser' }
            ],
            response: {
                schema: responseSchema.keys({ data: userSchema }),
                failAction: 'log'
            },
            validate: {
                params: Joi.object({
                    userName: Joi.string()
                }),
            },
            handler: async (request: Request, reply: ResponseToolkit) => {
                const user: IUser | undefined = await controller.getByUsername(request.params.userName);
                return reply.response({
                    statusCode: 200,
                    data: user
                } as IResponse).code(200);
            }
        }
    });
}
