import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { SharedModule } from 'src/core/shared/shared.module';
import { SocialUser } from './social-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SocialUser]),
    SharedModule
  ],
  providers: [
    UserService
  ],
  controllers: [UsersController],
  exports: [
    UserService
  ]
})
export class UsersModule { }
