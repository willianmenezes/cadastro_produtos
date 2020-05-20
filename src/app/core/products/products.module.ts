import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './products.component';
import { ProductNavComponent } from './product-nav/product-nav.component';

@NgModule({
    declarations: [
        ProductsComponent,
        ProductNavComponent
    ],
    imports: [
        CommonModule
    ],
    exports: []
})
export class ProdutoModule {

}