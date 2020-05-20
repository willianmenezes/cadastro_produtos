import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';


@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    // classe responsável por impedir que o usuário vá para a telad e login caso ele esteja logado

    constructor(private userService: UserService,
                private router: Router) { }

    // enviar para a rota home caso o user logado tente acessar o rota de login
    canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.userService.getUserLogged()){

            this.router.navigate(['home']);
            return false;
        }

        return true;
    }

}