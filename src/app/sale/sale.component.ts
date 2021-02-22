import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Sale } from '../models/sale';
import { Client } from '../models/client';
import { Product } from '../models/product';
import { ClientService } from '../services/client.service';
import { ProductService } from '../services/product.service';
import { SaleService } from '../services/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css'],
})
export class SaleComponent implements OnInit {
  dataSaved = false;
  saleForm: any;
  allSales: Observable<Sale[]>;
  allClients: Observable<Client[]>;
  productNames: any;
  allProducts: Observable<Product[]>;
  saleIdUpdate = null;
  message = null;

  constructor(
    private saleservice: SaleService,
    private productservice: ProductService,
    private clientservice: ClientService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.saleForm = this.fb.group({
      productName: [''],
      clientName: [''],
      saleQuantity: ['', [Validators.required]],
      productUnitvalue: ['', [Validators.required]],
      saleTotalvalue: [''],
    });

    this.loadAllProducts();
    this.loadAllClients();
    this.loadAllSales();
  }

  loadAllSales() {
    this.allSales = this.saleservice.getAllSaleDetails();
  }
  loadAllProducts() {
    this.productNames = this.productservice.getAllProductDetails();
  }

  loadAllClients() {
    this.allClients = this.clientservice.getAllClientDetails();
  }

  onFormSubmit() {
    this.dataSaved = false;
    const sale = this.saleForm.value;

    let x = sale.saleQuantity;
    let y = sale.productUnitvalue;
    let total = x * y;

    this.saleForm.addControl('saleTotalvalue', this.fb.control(''));

    console.log(total);
    console.log(sale);
    this.CreateSale(sale);
    this.saleForm.reset();
    // this.multiplicar();
  }

  loadSaleToEdit(saleId: string) {
    this.saleservice.getSaleById(saleId).subscribe((sale) => {
      this.message = null;
      this.dataSaved = false;
      this.saleIdUpdate = sale.saleId;
      this.saleForm.controls.productName.setValue(sale.productName);
      this.saleForm.controls.clientName.setValue(sale.clientName);
      this.saleForm.controls.saleQuantity.setValue(sale.saleQuantity);
      this.saleForm.controls.productUnitvalue.setValue(sale.productUnitvalue);
    });
  }

  CreateSale(sale: Sale) {
    if (this.saleIdUpdate == null) {
      this.saleservice.createSale(sale).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Registro Guardado Satisfactoriamente';
        this.loadAllSales();
        this.saleIdUpdate = null;
        this.saleForm.reset();
      });
    } else {
      sale.saleId = this.saleIdUpdate;
      this.saleservice.updateSale(sale).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Registro Actualizado Satisfactoriamente';
        this.loadAllSales();
        this.saleIdUpdate = null;
        this.saleForm.reset();
      });
    }
  }

  deleteSale(saleId: string) {
    if (confirm('Esta seguro de borrar el registro ?')) {
      this.saleservice.deleteSaleById(saleId).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Registro Borrado Satisfactoriamente';
        this.loadAllSales();
        this.saleIdUpdate = null;
        this.saleForm.reset();
      });
    }
  }

  resetForm() {
    this.saleForm.reset();
    this.message = null;
    this.dataSaved = false;
  }
}
