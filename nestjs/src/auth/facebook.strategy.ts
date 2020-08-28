import { Injectable } from '@nestjs/common';
import * as PassportFacebookStrategy from 'passport-facebook';
import { use } from 'passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { Configuration, SocialAuthProviderEnum } from 'src/models';

@Injectable()
export class FacebookStrategy {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService<Configuration>,
    ) {
        this.init();
    }
    init() {
        use('facebook',
            new PassportFacebookStrategy(
                {
                    clientID: this.configService.get('facebook').appId || 'disabled',
                    clientSecret: this.configService.get('facebook').clientSecret || 'disabled',
                    profileFields: ['id', "email", "displayName", "name", "photos"],
                    callbackURL: `${this.configService.get('appUrl')}/api/auth/facebook/callback`,
                },
                async (
                    accessToken: string,
                    refreshToken: string,
                    profile: any,
                    done: any,
                ) => {
                    try {
                        const resp = await this.authService.socialLogin(profile, SocialAuthProviderEnum.FACEBOOK);
                        done(null, resp);
                    } catch (err) {
                        done(err, false);
                    }
                },
            ),
        );
    }
}