import Boom from "@hapi/boom";
import { inject, injectable } from "tsyringe";
import { generateJwt } from "../../../helpers/auth.helper";
import { IPagerPesponse } from "../../../interfaces/IPagerPesponse";
import { IUser, User } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";


export interface ISigninPayload {
    username: string,
    password: string
}
export interface IUserController {
    getUsers(name: null | string, page: number): Promise<IPagerPesponse>;
    getByUsername(username: string): Promise<User>;
    upsert(user: IUser): Promise<User>;
    signIn(signInPayload: ISigninPayload): Promise<string>;
    updatePassword(password: string, username: string): Promise<User>
    setUserByUsername(username: string, user: IUser): Promise<User>;
}

@injectable()
export class UserController implements IUserController {
    constructor(@inject('IUserService') private userService: UserService) { }   

    public async getUsers(name: null | string, page: number) {
        return await this.userService.fetchAll(name, page);
    }    

    public async getByUsername(username: string): Promise<User> {
        const user = await this.userService.fetchByUsername(username);
        if (!user) { throw Boom.notFound('User could not found'); }
        return user;
    }

    public async upsert(user: IUser): Promise<User> {
        const oldUser = await this.userService.fetchByUsername(user.username);
        if (oldUser) { throw Boom.badRequest('Your username has been existed in database') }
        return await this.userService.upsert(user);
    }

    public async signIn(signInPayload: ISigninPayload): Promise<string> {
        const user = await this.userService.authUser(signInPayload.username, signInPayload.password);
        if (!user) { throw Boom.notFound('User could not found'); }
        const jwt = generateJwt({
            username: user.username,
            isRoot: user.isRoot,
            scopes: await this.userService.mergeScopesByRole(user, (user.role ? user.role.id : -1))
        });
        return jwt;
    }

    public async updatePassword(password: string, username: string): Promise<User> {
        const user = await this.userService.fetchByUsername(username);
        user.password = this.userService.generateHashPassword(password);
        return await this.userService.upsert(user);
    }

     public async setUserByUsername(username: string, user: IUser): Promise<User> {
        const originalUser = await this.userService.fetchByUsername(username);
        if (!originalUser || user.username !== username) throw Boom.notFound('User could not found');
        if (user.password) user.password = this.userService.generateHashPassword(user.password);
        return await this.userService.upsert(user);
    }
}
