import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'tcc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    formLogin: FormGroup;

    constructor(
        private fb: FormBuilder
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
}