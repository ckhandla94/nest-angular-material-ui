import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    isLoggedIn = false;

    constructor(
        private http: HttpClient
    ) {

    }

    changePassword(request: any) {
        return this.http.post('change-password', request).toPromise();
    }

    getUser() {
        return this.http.get('user/me').toPromise();
    }

}
