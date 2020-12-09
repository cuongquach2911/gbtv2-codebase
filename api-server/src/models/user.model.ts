import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ScopeEnum } from '../configs/scope.enum';
import { IRole, Role } from './role.model';

export interface IUser {
    firstName: string;
    lastName: string;
    username: string;
    password?: string;
    birthday?: number;
    email: string;
    phone?: string;
    bio?: string;
    scopes: ScopeEnum[];
    isRoot: boolean;
    role: IRole;
    active: boolean;
    createdAt?: number;
    updatedAt?: number;
}

export const serializeUser = (user: User): User => {
    if (user) { delete user.password; }
    return user;
}

@Entity()
export class User implements IUser {    
    @PrimaryColumn({ length: 50 })
    username: string;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({ length: 256 })
    password?: string;

    @Index()
    @ManyToOne(() => Role)
    @JoinColumn()
    role: Role;

    @Column({ default: null, nullable: true })
    birthday: number;

    @Column({ length: 256 })
    email: string;

    @Column({ length: 20, nullable: true })
    phone: string;

    @Column({ type: "text", default: null, nullable: true })
    bio: string;

    @Column({ type: "enum", enum: ScopeEnum, array: true, default: [], nullable: true })
    scopes: ScopeEnum[];

    @Column({ default: true })
    isRoot: boolean;

    @Column({ default: true })
    active: boolean;  

    @UpdateDateColumn({ type: "timestamp" })
    createdAt: number;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt?: number;
}
