import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ScopeEnum } from '../configs/scope.enum';

export interface IRole {
    id: number;
    title: string;
    scopes: ScopeEnum[];
    active: boolean;
}

@Entity()
export class Role implements IRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: "enum", enum: ScopeEnum, array: true, default: [], nullable: true })
    scopes: ScopeEnum[];

    @Column({ default: true })
    active: boolean;  

    @UpdateDateColumn({ type: "timestamp" })
    createdAt: number;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt?: number;
}
