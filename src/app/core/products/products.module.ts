import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProductsComponent } from './products.component';
import { ProductNavComponent } from './product-nav/product-nav.component';
import { ProductComponent } from './product/product.component';

@NgModule({
    declarations: [
        ProductsComponent,
        ProductNavComponent,
        ProductComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    exports: [],
    providers: []
})
export class ProductsModule {

}