import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';

import { ProductResponse } from 'src/app/models/product-response';
import { ProductsService } from '../../services/products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductRequest } from 'src/app/models/product-request';
import { EditProductRequest } from 'src/app/models/edit-product-request';
import * as alertify from 'alertifyjs';

declare const $: any;

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html'
})
export class ProductComponent implements OnChanges, OnInit {

    // classe responsável por registrar um novo produto e atualizar um produto existente

    title: string;
    @Input() product: ProductResponse;
    formSalvar: FormGroup
    file: File;
    editImage: string = '';

    constructor(
        private productService: ProductsService,
        private fb: FormBuilder) { }

    ngOnInit(): void {
        this.formSalvar = this.fb.group({
            name: [
                '',
                [
                    Validators.maxLength(200),
                    Validators.required
                ]
            ],
            price: [
                '',
                [
                    Validators.required
                ]
            ],
            file: [
                '',
                [
                    Validators.required
                ]
            ]
        })
    }

    ngOnChanges(changes: SimpleChanges): void {

        // atribui valores aos campos caso o producto seja passado
        if (changes.product.currentValue != null) {

            this.title = 'Editar produto';
            this.formSalvar.get('name').setValue(changes.product.currentValue.name);
            this.formSalvar.get('price').setValue(changes.product.currentValue.price);
            this.editImage = changes.product.currentValue.urlImage;

            var btn = document.getElementById("btn-submit") as HTMLButtonElement;
            btn.disabled = false;

        } else {

            this.title = 'Cadastrar produto';
        }
    }

    // zera as variaveis apos fechar modal
    closeModal() {

        this.productService.clearProduct();
        this.formSalvar.reset();
        this.editImage = ''
        this.file = null;
        this.product = null;
    }

    // Salva as requisições tanto de edit quanto de register product
    saveData() {

        if (this.product == null) {

            var product: ProductRequest = this.formSalvar.getRawValue();

            this.productService
                .registerProduct(product, this.file)
                .subscribe((response) => {

                    if (response) {
                        alertify.success(response.message);
                        $('#staticBackdrop').modal('hide');
                        this.formSalvar.reset();
                        this.productService.setUpdateList();
                        this.closeModal();
                    }
                }, err => {
                    console.log(err);
                    alertify.success('Erro ao registrar produto');
                })

        } else {

            var editProduct: EditProductRequest = this.formSalvar.getRawValue();
            editProduct.productId = this.product.productId;

            this.productService
                .editProduct(editProduct, this.file)
                .subscribe((response) => {

                    if (response) {
                        alertify.success(response.message);
                        $('#staticBackdrop').modal('hide');
                        this.formSalvar.reset();
                        this.productService.setUpdateList();
                    }
                }, err => {
                    console.log(err);
                    alertify.success('Erro ao editar produto');
                })
        }
    }

    // atribui imagem a variavel file e converte a imagem para exibir como preview
    changeFile(file: File){

        this.file = file;

        const reader = new FileReader();
        reader.onload = (event: any) => this.editImage = event.target.result;
        
        reader.readAsDataURL(file);
    }   
}