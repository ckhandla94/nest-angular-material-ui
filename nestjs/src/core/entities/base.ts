import {
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn
} from 'typeorm';
import { BaseEntity as IBaseEntity } from 'src/models';

export abstract class Base implements IBaseEntity {
    constructor(input?: any) {
        if (input) {
            Object.assign(this, input);
        }
    }

    @PrimaryGeneratedColumn('uuid')
    id?: string;


    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
