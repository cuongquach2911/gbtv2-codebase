import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { ScopeEnum } from '../configs/scope.enum';

export interface IScopeService {
    fetchByUsername(username: string): Promise<ScopeEnum[] | undefined>;
    updateByUsername(username: string, scopes: ScopeEnum[]): Promise<ScopeEnum[] | undefined>;
    fetchAllScopes(): Promise<string[]>;
}

@injectable()
export class ScopeService implements IScopeService {
    private repository = getCustomRepository(UserRepository);

    async fetchByUsername(username: string): Promise<ScopeEnum[] | undefined> {
        return (await this.repository.findOne({ username }))?.scopes;
    }

    async updateByUsername(username: string, scopes: ScopeEnum[]): Promise<ScopeEnum[] | undefined> {
        let user; if (user = await this.repository.findOne({ username })) {
            user.scopes = scopes;
            await this.repository.save(user);
        }
        return user?.scopes;
    }

    async fetchAllScopes(): Promise<string[]> {
        return Object.keys(ScopeEnum);
    }
}
