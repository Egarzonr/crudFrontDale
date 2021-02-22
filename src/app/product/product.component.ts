import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  dataSaved = false;
  productForm: any;
  allProducts: Observable<Product[]>;
  productIdUpdate = null;
  message = null;

  constructor(
    private productservice: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      productUnitvalue: ['', [Validators.required]],
    });
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.allProducts = this.productservice.getAllProductDetails();
  }
  onFormSubmit() {
    this.dataSaved = false;
    const product = this.productForm.value;
    console.log(product);
    this.CreateProduct(product);
    this.productForm.reset();
  }

  loadProductToEdit(productId: string) {
    this.productservice.getProductById(productId).subscribe((product) => {
      this.message = null;
      this.dataSaved = false;
      this.productIdUpdate = product.productId;
      this.productForm.controls.productName.setValue(product.productName);
      this.productForm.controls.productUnitvalue.setValue(
        product.productUnitvalue
      );
    });
  }

  CreateProduct(product: Product) {
    if (this.productIdUpdate == null) {
      this.productservice.createProduct(product).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Registro Guardado Satisfactoriamente';
        this.loadAllProducts();
        this.productIdUpdate = null;
        this.productForm.reset();
      });
    } else {
      product.productId = this.productIdUpdate;
      this.productservice.updateProduct(product).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Registro Actualizado Satisfactoriamente';
        this.loadAllProducts();
        this.productIdUpdate = null;
        this.productForm.reset();
      });
    }
  }

  deleteProduct(productId: string) {
    if (confirm('Esta seguro de borrar el registro ?')) {
      this.productservice.deleteProductById(productId).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Registro Borrado Satisfactoriamente';
        this.loadAllProducts();
        this.productIdUpdate = null;
        this.productForm.reset();
      });
    }
  }

  resetForm() {
    this.productForm.reset();
    this.message = null;
    this.dataSaved = false;
  }
}
