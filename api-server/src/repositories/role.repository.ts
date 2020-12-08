import { EntityRepository, Repository } from "typeorm";
import { Role } from "../models/role.model";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
}
