import { inject, injectable } from "tsyringe";
import { IUser, User } from "../../../models/user";
import { UserService } from "../../../services/user-service";

export interface IUserController {
  getById(id: number): IUser;
  getByUsername(username: string): Promise<User>;
  create(user: IUser): Promise<User>;
}

@injectable()
export class UserController implements IUserController {
  constructor(@inject('IUserService') private userService: UserService) {}

  public getById(id: number): IUser {
    return {
      id: 1234567,
      firstName: 'Cuong number',
      lastName: 'Quach',
      userName: 'cuongquach2911',
      createdAt: 12345678,
      active: true
    };
  }

  public async getByUsername(userName: string): Promise<User> {
    return await this.userService.getByUsername(userName);
  }

  public async create(user: IUser): Promise<User> {
    return await this.userService.create(user);
  }
}
