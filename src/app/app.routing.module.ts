import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './core/home/login/login.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { NotAuthorizedComponent } from './errors/not-authorized/not-authorized.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    {
        path: 'not-authorized',
        component: NotAuthorizedComponent
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutinModule {

}