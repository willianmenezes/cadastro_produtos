import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    // classe responsável por não deixar o usuário acessar a aplicação sem estar logado

    constructor(
        private userService: UserService,
        private router: Router) { }

    canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        // caso o user não esteja logado manda pra rota home
        if (!this.userService.getUserLogged()) {

            this.router.navigate(['']);
            return false;
        }

        return true;
    }

}