import * as alertify from 'alertifyjs'
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AutenticateResponse } from 'src/app/models/autenticate-response';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    formLogin: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        //Criação e do objeto do formulário validação formulário
        this.formLogin = this.fb.group({
            userName: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/[0-9]{11}/) // rergex para não permitir um cpf com mais de 11 digitos
                ]
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.maxLength(11),
                    Validators.minLength(11)
                ]
            ]
        });
    }

    logar() {
        const userName = this.formLogin.get('userName').value;
        const password = this.formLogin.get('password').value;

        this.authService
            .autenticar(userName, password)
            .subscribe((response: AutenticateResponse) => {

                console.log(response);

                if (response.success == true) {
                    this.userService.setUserLogged();
                    alertify.success('Bem vindo!');
                    this.router.navigate(["painel"]);
                } else {
                    alertify.error(response.error);
                    console.log(response.error);
                }
            }, (error: HttpErrorResponse) => {

                console.log(error);
            });
    }
}