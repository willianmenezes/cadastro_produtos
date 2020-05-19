import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { AutenticateResponse } from 'src/app/models/autenticate-response';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) { }

    autenticar(userName: string, password: string) {

        var userBase64 = window.btoa(userName + ':' + password);
        this.userService.setToken(userBase64);

        return this.http
            .post(environment.ApiUrlAuth, { observe: 'response' });
    }
}