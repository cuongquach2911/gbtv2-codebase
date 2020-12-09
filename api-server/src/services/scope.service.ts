import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { ScopeEnum } from '../configs/scope.enum';
import { RoleRepository } from '../repositories/role.repository';
import { Boom } from '@hapi/boom';

export interface IScopeService {
    fetchByUsername(username: string): Promise<ScopeEnum[] | undefined>;
    updateByUsername(username: string, scopes: ScopeEnum[]): Promise<ScopeEnum[] | undefined>;
    fetchAllScopes(): Promise<string[]>;
}

@injectable()
export class ScopeService implements IScopeService {
    private userRepository = getCustomRepository(UserRepository);
    private roleRepository = getCustomRepository(RoleRepository);    

    async fetchByUsername(username: string): Promise<ScopeEnum[] | undefined> {
        return (await this.userRepository.findOne({ username }))?.scopes;
    }

    async updateByUsername(username: string, scopes: ScopeEnum[]): Promise<ScopeEnum[] | undefined> {
        let user; if (user = await this.userRepository.findOne({ username })) {
            user.scopes = scopes;
            await this.userRepository.save(user);
        }
        return user?.scopes;
    }

    async fetchByRoleId(id: number): Promise<ScopeEnum[] | undefined> {
        return (await this.roleRepository.findOne({id}))?.scopes;
    }

    async fetchAllScopes(): Promise<string[]> {
        return Object.keys(ScopeEnum);
    }
}
