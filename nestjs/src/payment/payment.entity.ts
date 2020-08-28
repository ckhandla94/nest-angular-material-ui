import {
    Payment as IPayment, PaymentStatusEnum
} from 'src/models/payment';
import {
    Column,
    Entity,
    AfterLoad,
    ManyToOne,
    RelationId,
    JoinColumn,
} from 'typeorm';
import { Base } from '../core/entities/base';
import { UserStatusEnum } from 'src/models';
import { User } from 'src/users/user.entity';

@Entity('payment')
export class Payment extends Base implements IPayment {

    @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn()
    user?: User;

    @RelationId((payment: Payment) => payment.user)
    @Column()
    userId?: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
    amount?: number;

    @Column({ nullable: true })
    transactionId?: string;

    @Column({ nullable: true, type:'text' })
    transactionData?: string;

    @Column({
        default: PaymentStatusEnum.PENDING,
    })
    status?: PaymentStatusEnum;
}
