import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserService } from './auth/user.service';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    async init() {
        if (this.authService.isLoggedIn) {
            this.userService.getUser().then((data: any) => {
                this.authService.user = data;
            });
        }
    }

}
