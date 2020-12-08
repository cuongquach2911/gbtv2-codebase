import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { pagerVaribles } from '../configs/constants';
import { IPagerPesponse } from '../interfaces/IPagerPesponse';
import { IUser, serializeUser, User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import * as crypto from 'crypto';

export interface IUserService {
    fetchAll(name: any, page: number): Promise<IPagerPesponse>;
    fetchByUsername(username: string): Promise<User | undefined>;
    fetchById(id: number): Promise<User | undefined>;
    upsert(user: IUser): Promise<User>;
}

@injectable()
export class UserService implements IUserService {
    private repository = getCustomRepository(UserRepository);

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
        const user = await this.repository.findOne({ username });
        return serializeUser(user as User);
    }

    async fetchById(id: number) {
        const user = await this.repository.findOne({ id });
        return serializeUser(user as User);
    }

    async authUser(username: string, passwords: string) {
        const md5 = crypto.createHash('md5').update(passwords).digest('hex');
        //console.log(md5);
        const user = await this.repository.findOne({ username, passwords: md5 });
        return serializeUser(user as User);
    }

    async upsert(user: IUser): Promise<User> {
        user.passwords = crypto.createHash('md5').update(user.passwords + '').digest('hex');
        const newUser = await this.repository.save(user);
        return serializeUser(newUser);
    }
}
