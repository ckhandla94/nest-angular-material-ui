import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Configuration } from 'src/models';
import { FacebookStrategy } from './facebook.strategy';
import { SharedModule } from 'src/core/shared/shared.module';
import { UserService } from 'src/users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { SocialUser } from 'src/users/social-user.entity';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([User, SocialUser]),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<Configuration>): JwtModuleOptions => {
        return {
          secret: config.get('jwt').secret,
          // signOptions: { 
          //   expiresIn: '60s' 
          // },
        }
      },
      inject: [ConfigService]
    }),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
  ]
})
export class AuthModule { }
