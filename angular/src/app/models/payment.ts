import { Model } from './model';
import { User } from './user';


export interface Payment extends Model {
    user?: User;
    userId?: string;
    amount?: number;
    transactionId?: string;
    transactionData?: string;
    status?: PaymentStatusEnum;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum PaymentStatusEnum {
    SUCCESS = 'success',
    PENDING = 'pending',
    FAILD = 'faild',
}