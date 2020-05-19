import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';


@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private userService: UserService,
                private router: Router) { }

    canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.userService.getUserLogged()){

            this.router.navigate(['painel']);
            return false;
        }

        return true;
    }

}