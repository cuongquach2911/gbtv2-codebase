import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { serialize } from 'v8';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    passWords?: string;
    birthday?: number;
    email: string;
    phone?: string;
    bio?: string;
    isRoot: boolean;
    active: boolean;
    createdAt?: number;
    updatedAt?: number;
}

export const serializeUser = (user: User): User => {
    if (user) { delete user.passWords; }
    return user;
}

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({ length: 50 })
    userName: string;

    @Column({ length: 256 })
    passWords?: string;

    @Column({ default: null, nullable: true })
    birthday: number;

    @Column({ length: 256 })
    email: string;

    @Column({ length: 20, nullable: true })
    phone: string;

    @Column({ type: "text", default: null, nullable: true })
    bio: string;

    @Column({ default: true })
    isRoot: boolean;

    @Column({ default: true })
    active: boolean;    

    @UpdateDateColumn({ type: "timestamp" })
    createdAt: number;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt?: number;
}
