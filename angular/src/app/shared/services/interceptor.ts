import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AppStorage } from './storage/app-storage';
import { environment } from 'src/environments/environment';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
    isBrowser: boolean;

    constructor(
        @Inject(AppStorage) private appStorage: Storage,
        @Inject(PLATFORM_ID)
        platform: any
    ) {
        this.isBrowser = isPlatformBrowser(platform);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.appStorage.getItem('token');
        console.log({ url: req.url, token });
        let options: any = {
            url: req.url.startsWith('http') ? req.url : environment.apiUrl + '/api/' + req.url
        };
        if (token !== undefined && token !== null && token !== '' && token !== 'null') {
            options = {
                ...options,
                headers: req.headers.set('Authorization', `Bearer ${token}`),
            };
        }
        const reqClone = req.clone(options);
        return next.handle(reqClone);
    }
}
