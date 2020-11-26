import Boom from "@hapi/boom";
import { inject, injectable } from "tsyringe";
import { generateJwt } from "../../../helpers/auth.helper";
import { IPagerPesponse } from "../../../interfaces/IPagerPesponse";
import { IUser, User } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";

export interface ISigninPayload {
    userName: string,
    passWords: string
}

export interface IUserJwt {
    userName: string,
    isRoot: boolean,
    scopes: string[]
}

export interface IUserController {
    getUsers(name: null | string, page: number): Promise<IPagerPesponse>;
    getById(id: number): Promise<User>;
    getByUsername(username: string): Promise<User>;
    create(user: IUser): Promise<User>;
    signIn(signInPayload: ISigninPayload): Promise<string>;
}

@injectable()
export class UserController implements IUserController {
    constructor(@inject('IUserService') private userService: UserService) { }   

    public async getUsers(name: null | string, page: number) {
        return await this.userService.getUsers(name, page);
    }

    public async getById(id: number): Promise<User> {
        const user = await this.userService.getById(id);
        if (!user) { throw Boom.notFound('User could not found'); }
        return user;
    }

    public async getByUsername(userName: string): Promise<User> {
        const user = await this.userService.getByUsername(userName);
        if (!user) { throw Boom.notFound('User could not found'); }
        return user;
    }

    public async create(user: IUser): Promise<User> {
        const oldUser = await this.userService.getByUsername(user.userName);
        if (oldUser) { throw Boom.badRequest('Your username has been existed in database.') }
        return await this.userService.create(user);
    }

    public async signIn(signInPayload: ISigninPayload): Promise<string> {
        const user = await this.userService.authUser(signInPayload.userName, signInPayload.passWords);
        if (!user) { throw Boom.notFound('User could not found.'); }
        const jwt = generateJwt({
            userName: user.userName,
            isRoot: user.isRoot,
            scopes: []
        });
        return jwt;
    }
}
