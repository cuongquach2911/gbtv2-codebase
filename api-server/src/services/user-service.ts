import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { IUser, User } from '../models/user';
import { UserRepository } from '../repositories/user-repository';

export interface IUserService {
  getByUsername(username: string): Promise<User | unknown>;
  getById(id: number): Promise<User| unknown>;
  create(user: IUser): Promise<User>;
}

@injectable()
export class UserService implements IUserService {
  private repository = getCustomRepository(UserRepository);
 
  async getByUsername(userName: string) {
    const user = await this.repository.findOneOrFail({ userName });
    delete user.passWords;
    return user;
  }

  async getById(id: number) {
    return await this.repository.findOneOrFail({ id });
  }

  async create(user: IUser): Promise<User> {
    const newUser = await this.repository.save(user);
    delete newUser.passWords;
    return newUser;
  }
}
