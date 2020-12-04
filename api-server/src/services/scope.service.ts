import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { ScopeEnum } from '../configs/scope.enum';

export interface IScopeService {
    getUserScopes(username: string): Promise<ScopeEnum[] | undefined>;
    setUserScopes(username: string, scopes: ScopeEnum[]): Promise<ScopeEnum[] | undefined>;
}

@injectable()
export class ScopeService implements IScopeService {
    private repository = getCustomRepository(UserRepository);

    async getUserScopes(username: string): Promise<ScopeEnum[] | undefined> {
        return (await this.repository.findOne({ username }))?.scopes;
    }

    async setUserScopes(username: string, scopes: ScopeEnum[]): Promise<ScopeEnum[] | undefined> {
        let user; if (user = await this.repository.findOne({ username })) {
            user.scopes = scopes;
            await this.repository.save(user);
        }
        return user?.scopes;
    }

    async getAllScopes(): Promise<string[]> {
        return Object.keys(ScopeEnum);
    }
}
