import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-product-nav',
    templateUrl: './product-nav.component.html',
    styleUrls: ['./product-nav.component.css']
})
export class ProductNavComponent {

    // componente resposável de exibir o nav e suas funcionalidades
    constructor(private userService: UserService, private router: Router){}

    logout(){
        this.userService.deleteUserLogged();
        this.router.navigate(['']);
    }
}