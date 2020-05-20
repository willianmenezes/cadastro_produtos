import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { ProductPaginationRequest } from 'src/app/models/product-pagination-request';
import { PaginationResponse } from 'src/app/models/pagination-response';
import { ProductResponse } from 'src/app/models/product-response';
import { RequestResponseEntity, RequestResponse } from 'src/app/models/request-response';
import { ProductRequest } from 'src/app/models/product-request';
import { EditProductRequest } from 'src/app/models/edit-product-request';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(
        private http: HttpClient
    ) { }

    getAllProductPaginated(pagination: ProductPaginationRequest) {

        return this.http.post<PaginationResponse<ProductResponse>>(`${environment.ApiUrlProdutos}/products/paginated`, { ...pagination }, { observe: 'body' });
    }

    registerProduct(request: ProductRequest) {
        
        return this.http.post<RequestResponseEntity<ProductResponse>>(`${environment.ApiUrlProdutos}/products/register`, { ...request }, { observe: 'body' });
    }

    editProduct(request: EditProductRequest){

        return this.http.put<RequestResponse>(`${environment.ApiUrlProdutos}/products`, { ...request }, { observe: 'body' });
    }

    deleteProductAsync(productId: string){
        
        return this.http.delete<RequestResponse>(`${environment.ApiUrlProdutos}/products/${productId}`, { observe: 'body' });
    }
}