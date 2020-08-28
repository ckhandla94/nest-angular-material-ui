import { Controller, Post, Body, Get, UseGuards, Req, Res, Param } from '@nestjs/common';
import { LoginInput, RegisterInput } from 'src/models/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ) { }

    @Post('login')
    async login(@Body() req: LoginInput) {
        return this.authService.login(req);
    }

    @Post('register')
    async register(@Body() req: RegisterInput) {
        return this.authService.register(req);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
    }


    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req, @Res() res) {
        const {
            access_token
        } = req.user;
        return res.redirect(
            `${this.configService.get('frontUrl')}/login?jwt=${access_token}`
        );
    }

    @Get('facebook')
    @UseGuards(AuthGuard('facebook'))
    facebookLogin() {
        console.log('facebook');
    }

    @Get('facebook/callback')
    @UseGuards(AuthGuard('facebook'))
    facebookLoginCallback(@Req() req, @Res() res) {
        const {
            access_token
        } = req.user;
        return res.redirect(
            `${this.configService.get('frontUrl')}/login?jwt=${access_token}`
        );
    }
}
