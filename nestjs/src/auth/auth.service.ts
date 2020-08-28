import { Injectable, InternalServerErrorException, BadRequestException, ConflictException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInput, SocialAuthProviderEnum, RegisterInput } from 'src/models/auth';
import { JsonWebTokenError } from 'jsonwebtoken';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async login(request: LoginInput) {
        let user;
        try {
            if (!request.password || request.password === '') {
                throw new BadRequestException('Email or password is not valid');
            }

            user = await this.userService.findOne({
                email: request.email
            });

            if (!(await bcrypt.compare(request.password, user.password))) {
                throw new BadRequestException('Email or password is not valid');
            }
        } catch (error) {
            throw new BadRequestException('Email or password is not valid');
        }

        const payload = { email: user.email, id: user.id };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(req: RegisterInput) {

        let user = await this.userService.getUserByEmail(req.email);
        if (user) {
            throw new ConflictException('Email already exist');
        }

        const userInput: Partial<User> = {
            ...req,
            password: await bcrypt.hash(req.password, 12)
        }
        user = await this.userService.create(userInput);
        user = await this.userService.findOne(user.id);

        const payload = { id: user.id, email: user.email };
        const access_token: string = this.jwtService.sign(payload);
        return { access_token, user };
    }

    socialLogin(profile, provider: SocialAuthProviderEnum,) {
        console.log('socialLogin', provider, profile);
        switch (provider) {
            case SocialAuthProviderEnum.GOOGLE:
                return this.createUserIfNotExist(profile, provider);

            case SocialAuthProviderEnum.FACEBOOK:
                return this.createUserIfNotExist(profile, provider);

            default:
                throw new BadRequestException("Provider is not valid");
        }

    }

    async createUserIfNotExist(profile, provider: SocialAuthProviderEnum) {
        const { id, name, emails, photos } = profile

        try {

            if (await this.userService.checkIfExistsThirdParty(id, provider)) {
                const user = await this.userService.getIfExistsThirdParty(id, provider);
                if (user) {
                    const payload = { id: user.id, email: user.email };
                    const access_token: string = this.jwtService.sign(payload);
                    return { access_token, user };
                }
            }

            let email = '';
            for (const { value } of emails) {
                email = value;
                const userExist = await this.userService.checkIfExistsEmail(email);
                if (userExist) {
                    const user = await this.userService.getUserByEmail(email);
                    await this.userService.addThirdParty(user, provider, id);
                    const payload = { id: user.id, email: user.email };
                    const access_token: string = this.jwtService.sign(payload);
                    return { access_token, user };
                }
            }

            const userInput = {
                email: email,
                firstName: name.givenName,
                lastName: name.familyName,
                profilePic: photos[0].value,
            };
            const user = await this.userService.create(userInput);
            await this.userService.addThirdParty(user, provider, id);
            const payload = { id: user.id, email: user.email };
            const access_token: string = this.jwtService.sign(payload);
            return { access_token, user };

        } catch (err) {
            throw new InternalServerErrorException(
                'validateOAuthLoginEmail',
                err.message
            );
        }
    }
}
