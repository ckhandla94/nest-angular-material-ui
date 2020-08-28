import { BaseEntity } from "./base-entity";
import { User } from "src/users/user.entity";

export interface Payment extends BaseEntity {
    user?: User,
    userId?: string,
    amount?: number,
    transactionId?: string,
    transactionData?: string,
    status?: PaymentStatusEnum,
}

export enum PaymentStatusEnum {
    SUCCESS = 'success',
    PENDING = 'pending',
    FAILD = 'faild',
}