import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { SocialAuthProviderEnum } from 'src/models';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly authService: AuthService,
        configService: ConfigService,
    ) {
        super({
            clientID: configService.get('google').clientId || 'disabled',
            clientSecret: configService.get('google').clientSecret || 'disabled',
            callbackURL: `${configService.get('appUrl')}/api/auth/google/callback`,
            passReqToCallback: true,
            scope: ['profile', 'email']
        });
    }

    async validate(
        request: any,
        accessToken: string,
        refreshToken: string,
        profile,
        done: Function
    ) {
        console.log({
            request,
            accessToken,
            refreshToken,
            profile,
        });
        try {
            const resp = await this.authService.socialLogin(profile, SocialAuthProviderEnum.GOOGLE);
            done(null, resp);
        } catch (err) {
            done(err, false);
        }
    }
}
