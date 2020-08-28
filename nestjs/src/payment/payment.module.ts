import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { StripeModule } from 'nestjs-stripe';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Configuration } from 'src/models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Payment } from './payment.entity';

@Module({
  controllers: [PaymentController],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Payment]),
    StripeModule.forRootAsync({
      useFactory: (config: ConfigService<Configuration>) => {
        return {
          apiKey: config.get('stripe').privateKey,
          apiVersion: '2020-03-02',
        }
      },
      imports: [ConfigModule],
      inject: [ConfigService]
    })

  ],
  providers: [PaymentService]
})
export class PaymentModule { }
