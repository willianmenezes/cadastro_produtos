import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { ProductPaginationRequest } from 'src/app/models/product-pagination-request';
import { PaginationResponse } from 'src/app/models/pagination-response';
import { ProductResponse } from 'src/app/models/product-response';
import { RequestResponseEntity, RequestResponse } from 'src/app/models/request-response';
import { ProductRequest } from 'src/app/models/product-request';
import { EditProductRequest } from 'src/app/models/edit-product-request';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    // classe responsável por realizar as requisições para a entidade de produtos

    private $refreshProduct = new BehaviorSubject<boolean>(false);
    private $updateList = new BehaviorSubject<boolean>(false);

    constructor(
        private http: HttpClient
    ) { }

    getAllProductPaginated(pagination: ProductPaginationRequest) {

        return this.http.post<PaginationResponse<ProductResponse>>(`${environment.ApiUrlProdutos}/products/paginated`, { ...pagination }, { observe: 'body' });
    }

    registerProduct(request: ProductRequest, file: File) {

        const formData = new FormData();
        formData.append('name', request.name);
        formData.append('price', `${request.price}`);
        formData.append('file', file);

        return this.http.post<RequestResponseEntity<ProductResponse>>(`${environment.ApiUrlProdutos}/products/register`, formData);
    }

    editProduct(request: EditProductRequest, file: File) {

        const formData = new FormData();
        formData.append('name', request.name);
        formData.append('productId', request.productId);
        formData.append('price', `${request.price}`);
        formData.append('file', file);

        return this.http.put<RequestResponse>(`${environment.ApiUrlProdutos}/products`, formData);
    }

    deleteProductAsync(productId: string) {

        return this.http.delete<RequestResponse>(`${environment.ApiUrlProdutos}/products/${productId}`, { observe: 'body' });
    }

    // emitindo evento para atualizar propriedade de produto
    clearProduct() {
        this.$refreshProduct.next(true);
    }

    // escutador de eventos
    getProductObservable() {
        return this.$refreshProduct.asObservable();
    }
    // emitindo evento de lista atualizada
    setUpdateList() {
        this.$updateList.next(true);
    }

    // escutador de eventos
    getUpdateList() {
        return this.$updateList.asObservable();
    }
}