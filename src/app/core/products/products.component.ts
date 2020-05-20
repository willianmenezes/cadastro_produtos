import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../services/products.service';
import { ProductPaginationRequest } from 'src/app/models/product-pagination-request';
import { ProductResponse } from 'src/app/models/product-response';
import { PaginationResponse } from 'src/app/models/pagination-response';
import * as alertify from 'alertifyjs';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    // classe responsável por listar todos os produtos com paginação e excluir um produto

    product: ProductResponse;
    response: PaginationResponse<ProductResponse>;
    pagination: ProductPaginationRequest = {
        nameFilter: '',
        pageIndex: 1,
        pageSize: 5,
        price: 0
    }

    constructor(
        private productService: ProductsService
    ) {
    }

    ngOnInit(): void {
        this.getAllProductPaginated();

        //seta o produto como null apos emissão e evento
        this.productService
            .getProductObservable()
            .subscribe((response) => {
                if (response) {
                    this.product = null;
                }
            });

        // atualiza listagem de produtos apos emissão de cadastro de produtos 
        this.productService
            .getUpdateList()
            .subscribe((response) => {
                if (response) {
                    this.getAllProductPaginated();
                }
            })
    }

    // busca todos os produtos paginados
    getAllProductPaginated() {

        this.productService
            .getAllProductPaginated(this.pagination)
            .subscribe((response) => {

                if (response.items) {

                    this.response = response;
                }

            }, err => {
                console.log(err)
            })
    }

    // busca os produtos de acordo com as paginas selecionadas no leiaute
    getAllProductsPerPage() {
        setTimeout(() => {

            this.getAllProductPaginated();

        }, 1);
    }

    // filtra a lista com os dados do input
    getByFilter(value: string) {

        var filter = (document.getElementById('select-filter') as HTMLInputElement).value;

        if (filter === 'name' && value.length > 0) {

            this.pagination.nameFilter = value;

        } else if (filter === 'price' && value.length > 0) {

            this.pagination.price = parseFloat(value);

        } else {

            this.pagination.nameFilter = '';
            this.pagination.price = 0;
        }

        this.getAllProductPaginated();
    }

    // deleta um produto
    deleteProductAsync(productId: string) {

        this.productService
            .deleteProductAsync(productId)
            .subscribe((response) => {

                alertify.success(response.message);
                this.getAllProductPaginated();

            }, err => {
                console.log(err)
            })

    }

    modalEditproduct(product: ProductResponse) {

        this.product = product;
    }
}