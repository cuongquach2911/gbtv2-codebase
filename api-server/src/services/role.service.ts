import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { ScopeEnum } from '../configs/scope.enum';
import { RoleRepository } from '../repositories/role.repository';
import { IRole, Role } from '../models/role.model';
import { pagerVaribles } from '../configs/constants';
import { IPagerPesponse } from '../interfaces/IPagerPesponse';

export interface IRouteService {
    upsert(role: IRole): Promise<Role>;
    fetchAll(): Promise<Role[]>;
    fetch(page: number, filter: string): Promise<IPagerPesponse>;
    fetchById(id: number): Promise<Role | undefined>;
}

@injectable()
export class RoleService implements IRouteService {
    private repository = getCustomRepository(RoleRepository);

    async upsert(role: IRole): Promise<Role> {
        return await this.repository.save(role);
    }
    
    async fetchAll(): Promise<Role[]> {
        return await this.repository.find();
    }

    async fetch(page: number, filter: string) {
        const [data, count] = await this.repository
            .findAndCount({
                where: {
                    ...(filter ? { title: filter } : {})
                },
                take: pagerVaribles.pageSize,
                skip: pagerVaribles.skipCalculate(page)
            });
        return {
            count,
            data
        } as IPagerPesponse;
    }

    async fetchById(id: number): Promise<Role | undefined> {
        return this.repository.findOne({ id });
    }
}
