import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './core/home/login/login.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { NotAuthorizedComponent } from './errors/not-authorized/not-authorized.component';
import { LoginGuard } from './core/guards/login.guard';
import { ProductsComponent } from './core/products/products.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'painel',
        component: ProductsComponent,
        canActivate: [AuthGuard]
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