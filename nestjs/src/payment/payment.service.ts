import { Injectable } from '@nestjs/common';
import { StripeChargeInput } from 'src/models/stripe';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { RequestContext } from 'src/core/context/request-context';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Configuration, PaymentStatusEnum } from 'src/models';
import { Payment } from './payment.entity';
import { json } from 'express';

@Injectable()
export class PaymentService {
    constructor(
        @InjectStripe() private readonly stripeClient: Stripe,
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService<Configuration>
    ) {

    }
    
    get() {
        const user = RequestContext.currentUser();
        return this.paymentRepository.find({
            userId: user.id,
        });
    }
    
    getByTransactionId(transactionId: string) {
        return this.paymentRepository.findOne({
            transactionId: transactionId,
        });
    }

    async charge(req: StripeChargeInput) {
        const customerId = await this.createCustomerIfNotExists();
        const user = RequestContext.currentUser();
        const payment = await this.paymentRepository.create({
            userId: user.id,
            amount: req.amount,
        });

        await this.stripeClient.customers.createSource(customerId, { source: req.token, })

        const charge = await this.stripeClient.charges.create({
            amount: req.amount * 100,
            currency: this.configService.get('stripe').currency,
            customer: customerId,
            description: `Payment id ${payment.id}`
        })

        let status: PaymentStatusEnum;
        switch (charge.status) {
            case 'succeeded':
                status = PaymentStatusEnum.SUCCESS
                break;
            case 'failed':
                status = PaymentStatusEnum.FAILD
                break;
            case 'pending':
            default:
                status = PaymentStatusEnum.PENDING
                break;
        }

        payment.status = status;
        payment.transactionData = JSON.stringify(charge);
        payment.transactionId = charge.id;

        await this.paymentRepository.save(payment);

        return payment
    }

    async createCustomerIfNotExists() {
        const user = RequestContext.currentUser();
        const userEntiry = await this.userRepository.findOne(user.id);
        let stripeCustomerId: string;
        if (userEntiry && !userEntiry.stripeCustomerId) {
            const stripeCustomer = await this.stripeClient.customers.create({
                email: user.email,
                name: user.name,
            });

            await this.userRepository.update({
                id: user.id
            }, {
                stripeCustomerId: stripeCustomer.id
            })
        } else {
            stripeCustomerId = userEntiry.stripeCustomerId;
        }

        return stripeCustomerId;
    }
}
