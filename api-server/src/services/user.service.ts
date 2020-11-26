import { injectable } from 'tsyringe';
import { AdvancedConsoleLogger, getCustomRepository } from 'typeorm';
import { pagerVaribles } from '../configs/constants';
import { IPagerPesponse } from '../interfaces/IPagerPesponse';
import { IUser, serializeUser, User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import * as crypto from 'crypto';
import { Boom } from '@hapi/boom';

export interface IUserService {
    getUsers(name: any, page: number): Promise<IPagerPesponse>;
    getByUsername(username: string): Promise<User | undefined>;
    getById(id: number): Promise<User | undefined>;
    create(user: IUser): Promise<User>;
}

@injectable()
export class UserService implements IUserService {
    private repository = getCustomRepository(UserRepository);

    async getUsers(name: any, page: number): Promise<IPagerPesponse> {
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

    async getByUsername(userName: string) {
        const user = await this.repository.findOne({ userName });
        return serializeUser(user as User);
    }

    async getById(id: number) {
        const user = await this.repository.findOne({ id });
        return serializeUser(user as User);
    }

    async authUser(userName: string, passWords: string) {
        const md5 = crypto.createHash('md5').update(passWords).digest('hex');
        console.log(md5);
        const user = await this.repository.findOne({ userName, passWords: md5 });
        return serializeUser(user as User);
    }

    async create(user: IUser): Promise<User> {
        user.passWords = crypto.createHash('md5').update(user.passWords + '').digest('hex');
        const newUser = await this.repository.save(user);
        return serializeUser(newUser);
    }
}
