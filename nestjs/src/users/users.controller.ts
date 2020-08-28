import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { CurrentUser } from 'src/auth/decorator/current-user';
import { FindOneOptions } from 'typeorm';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(
        private readonly userService: UserService,
    ) {
        // super(userService);
    }

    @Get('/me')
    async findCurrentUser(@CurrentUser() user: User, @Query() request: FindOneOptions<User>): Promise<User> {
        return this.userService.findOne(user.id, request);
    }
}
