import { Model } from './model';

export interface User extends Model {
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    profilePic?: string;
    stripeCustomerId?: string;
    status?: UserStatusEnum;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum UserStatusEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending',
}