import { inject, injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { pagerVaribles } from '../configs/constants';
import { IPagerPesponse } from '../interfaces/IPagerPesponse';
import { IUser, serializeUser, User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import * as crypto from 'crypto';
import { RoleService } from './role.service';
import { ScopeEnum } from '../configs/scope.enum';

export interface IUserService {
    fetchAll(name: any, page: number): Promise<IPagerPesponse>;
    fetchByUsername(username: string): Promise<User | undefined>;
    upsert(user: IUser): Promise<User>;
    authUser(username: string, password: string): Promise<User>;
    mergeScopesByRole(user: User, roleId: number): Promise<ScopeEnum[]>;
    generateHashPassword(password: string): string;
}

@injectable()
export class UserService implements IUserService {
    private repository = getCustomRepository(UserRepository);

    constructor(
        @inject('IRoleService') private roleService: RoleService
    ) { } 

    async fetchAll(name: any, page: number): Promise<IPagerPesponse> {
        const [data, count] = await this.repository.findAndCount({
            where: {
                ...(name ? { name } : {})
            },
            take: pagerVaribles.pageSize,
            skip: pagerVaribles.skipCalculate(page)
        });
        return {
            count,
            data
        } as IPagerPesponse
    }

    async fetchByUsername(username: string) {
        const user = await this.repository.findOne({ username }, { relations: ['role'] });
        return serializeUser(user as User);
    }

    async authUser(username: string, password: string): Promise<User> {
        const md5 = crypto.createHash('md5').update(password).digest('hex');
        //console.log(md5);repository
        const user = await this.repository.findOne({ username, password: md5 }, { relations: ['role'] });
        return serializeUser(user as User);
    }

    async upsert(user: IUser): Promise<User> {
        user.password = crypto.createHash('md5').update(`${user.password}`).digest('hex');
        const newUser = await this.repository.save(user);
        return serializeUser(newUser);
    }

    async mergeScopesByRole(user: User, roleId: number): Promise<ScopeEnum[]> {
        const role = await this.roleService.fetchById(roleId);
        return role ? [...user.scopes, ...role.scopes] : user.scopes;
    }

    generateHashPassword(password: string): string {
        return crypto.createHash('md5').update(password).digest('hex');
    }
}
