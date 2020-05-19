import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, flatMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

declare const alertify: any;

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private userService: UserService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.userService.hasUSerBase64()) {

            const userBase64 = this.userService.getUser();

            if (userBase64) {
                req = req.clone({ headers: req.headers.set('Authorization', `Basic ${userBase64}`) });
            }

            if (!req.headers.has('Content-Type')) {
                req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
            }

            req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        }

        return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {

            console.log(err);
            throw err;

        }));
    }
}   