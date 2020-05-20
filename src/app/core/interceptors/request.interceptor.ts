import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

declare const alertify: any;

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    // classe responsável por interceptar todas as requisições e realizar os tratamentos no handle da requisição

    constructor(
        private router: Router,
        private loadingService: LoadingService,
        private userService: UserService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.userService.hasUSerBase64()) {

            const userBase64 = this.userService.getUser();

            if (userBase64) {
                req = req.clone({ headers: req.headers.set('Authorization', `Basic ${userBase64}`) });
            }

            req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        }

        return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {

            if (err.status == 401) {

                this.userService.deleteUserLogged();
                this.router.navigate(['']);
                alertify.warning("Sessão expirada. Realize o login novamente.");
                throw err;

            } else if (err.status == 0 && err.statusText == "Unknown Error") {

                this.userService.deleteUserLogged();
                alertify.error('Servidor indisponível');
                this.router.navigate(['']);
                this.loadingService.stop();
                throw err;

            } else {

                this.loadingService.stop();
                throw err;
            } 

        }));
    }
}   