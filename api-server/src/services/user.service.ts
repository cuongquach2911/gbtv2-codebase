import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { pagerVaribles } from '../configs/constants';
import { IPagerPesponse } from '../interfaces/IPagerPesponse';
import { IUser, serializeUser, User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';

export interface IUserService {
    getUsers(name: any, page: number): Promise<IPagerPesponse>;
    getByUsername(username: string): Promise<User | unknown>;
    getById(id: number): Promise<User | unknown>;
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
        const user = await this.repository.findOneOrFail({ userName });
        return serializeUser(user);
    }

    async getById(id: number) {
        const user = await this.repository.findOneOrFail({ id });
        return serializeUser(user);
    }

    async create(user: IUser): Promise<User> {
        const newUser = await this.repository.save(user);
        delete newUser.passWords;
        return newUser;
    }
}
