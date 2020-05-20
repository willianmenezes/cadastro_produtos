import { ProductRequest } from './product-request';

export interface EditProductRequest extends ProductRequest{
    
    productId: string
}