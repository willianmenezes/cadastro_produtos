import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() {

    }

    setToken(userBase64: string): void {
        localStorage.setItem('user', userBase64);
    }

    getUser() {
        return localStorage.getItem('user')
    }

    hasUSerBase64() {
        return !!this.getUser();
    }

    setUserLogged() {
        localStorage.setItem('userLogged', 'true');
    }

    getUserLogged() {
        return localStorage.getItem('userLogged');
    }
}