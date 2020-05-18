import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
    ]
})
export class HomeModule {

}