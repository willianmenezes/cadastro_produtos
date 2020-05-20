import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoadingService } from './loading.service';

@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // ouvindo  a requisição e emitindo o valor para a barra de carregaento
        return next.handle(req)
            .pipe(tap(event => {
                if (event instanceof HttpResponse) {
                    this.loadingService.stop();
                } else {
                    this.loadingService.start();
                }
            }));

    }
}