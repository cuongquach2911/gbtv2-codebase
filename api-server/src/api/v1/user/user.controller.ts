import Boom from "@hapi/boom";
import { inject, injectable } from "tsyringe";
import { IPagerPesponse } from "../../../interfaces/IPagerPesponse";
import { IUser, User } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";

export interface ISigninPayload {
    userName: string,
    passWords: string
}

export interface IUserJwt {
    userName: string,
    passWords: string,
    isRoot: boolean,
    scopes: string[]
}

export interface IUserController {
    getUsers(name: null | string, page: number): Promise<IPagerPesponse>;
    getById(id: number): Promise<User>;
    getByUsername(username: string): Promise<User>;
    create(user: IUser): Promise<User>;
    //signIn(signInPayload: ISigninPayload): Promise<IUserJwt>;
}

@injectable()
export class UserController implements IUserController {
    constructor(@inject('IUserService') private userService: UserService) { }   

    public async getUsers(name: null | string, page: number) {
        return await this.userService.getUsers(name, page);
    }

    public async getById(id: number): Promise<User> {
        try {
            return await this.userService.getById(id);
        } catch (e) { throw Boom.notFound('User could not found !'); }
    }

    public async getByUsername(userName: string): Promise<User> {
        try {
            return await this.userService.getByUsername(userName);
        } catch (e) { throw Boom.notFound('User could not found !'); }
    }

    public async create(user: IUser): Promise<User> {
        return await this.userService.create(user);
    }

    // public async signIn(signInPayload: ISigninPayload): Promise<IUserJwt> {
        
    // }
}
