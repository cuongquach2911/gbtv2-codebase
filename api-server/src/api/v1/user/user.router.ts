import { ResponseToolkit, Request, Server } from "@hapi/hapi";
import Joi from "joi";
import { container } from "tsyringe";
import { convertPage } from "../../../helpers/page.helper";
import { countAndRecordsSchema } from "../../../interfaces/countAndRecords.schema";
import { ICountAndRecords } from "../../../interfaces/ICountAndRecords";
import { IResponse } from "../../../interfaces/IResponse";
import { IRoute } from "../../../interfaces/IRoute";
import { responseSchema } from "../../../interfaces/response.schema";
import { IUser, User } from "../../../models/user.model";
import { UserController } from "./user.controller";
import { userSchema } from "./user.validator";

interface IUserRouter {
    getUsers(): void;
    getUserById(): void;
    getUserByUsername(): void;
    postUser(): void;
    //signIn(): void;
}

export class UserRouter implements IRoute, IUserRouter {
    private userController = container.resolve(UserController);
    private prefixSingle = process.env.API_ROUTE_PREFIX + '/user';
    private prefixPlural = process.env.API_ROUTE_PREFIX + '/users';
    private _server: Server;

    constructor(server: Server) {
        this._server = server;
    }

    getUsers(): void {
        this._server.route({
            method: "GET",
            path: this.prefixPlural,
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
                    const results = await this.userController.getUsers(null, convertPage(request.query.page));
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

    getUserByUsername(): void {
        this._server.route({
            method: "GET",
            path: this.prefixSingle + '/{userName}',
            options: {
                tags: ['api'],
                description: 'Public',
                notes: `Get User's detail`,
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
                    const user: IUser | undefined = await this.userController.getByUsername(request.params.userName);
                    return reply.response({
                        statusCode: 200,
                        data: user
                    } as IResponse).code(200);
                }
            }
        });
    }

    getUserById(): void {
        this._server.route({
            method: "GET",
            path: this.prefixSingle + '/{id}',
            options: {
                tags: ['api'],
                description: 'Public',
                notes: `Get User's detail`,
                response: {
                    schema: userSchema,
                    failAction: 'log'
                },
                validate: {
                    params: Joi.object({
                        userName: Joi.string()
                    }),
                },
                handler: async (request: Request, reply: ResponseToolkit) => {
                    const user: IUser | undefined = await this.userController.getByUsername(request.params.userName);
                    return reply.response(user).code(200);
                }
            }
        });
    }

    postUser(): void {
        this._server.route({
            method: "POST",
            path: this.prefixSingle,
            options: {
                tags: ['api'],
                description: 'Private',
                notes: `Create new User`,
                response: {
                    schema: responseSchema.keys({ data: userSchema }),
                    failAction: 'log'
                },
                validate: {
                    payload: userSchema.keys({ passWords: Joi.string().required() })
                },
                handler: async (request: Request, reply: ResponseToolkit) => {
                    const payload = request.payload as User;
                    return reply.response(await this.userController.create(payload)).code(200);
                }
            }
        });
    }

    // signIn(): void {
    //     this._server.route({
    //         method: "POST",
    //         path: this.prefixSingle,
    //         options: {
    //             tags: ['api'],
    //             description: 'Private',
    //             notes: `Log in to system and generating JWT token`,
    //             response: {
    //                 schema: responseSchema,
    //                 failAction: 'log'
    //             },
    //             validate: {
    //                 payload: Joi.object({
    //                     userName: Joi.string(),
    //                     passWords: Joi.string()
    //                 })
    //             },
    //             handler: async (request: Request, reply: ResponseToolkit) => {
    //                 const payload = request.payload as {
    //                     userName: string,
    //                     passWords: string
    //                 };

    //                 const user: User | undefined = await this.userController.signIn(payload.userName);                   
    //                 return reply.response(await this.userController.create(payload)).code(200);
    //             }
    //         }
    //     });
    // }

    attach() {
        this.getUsers();
        this.getUserByUsername();
        this.postUser();
    }
}
