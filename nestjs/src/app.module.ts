import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { Entities } from './entities';
import { SharedModule } from './core/shared/shared.module';
import { SeederService } from './seeder.service';
import { PaymentModule } from './payment/payment.module';
import { RequestContextMiddleware } from './core/context/request-context.middleware';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => {
        return {
          ...config.get('database'),
          entities: Entities,
          synchronize: true,
        }
      },
      inject: [ConfigService]
    }),
    AuthModule,
    UsersModule,
    PaymentModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    SeederService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}

