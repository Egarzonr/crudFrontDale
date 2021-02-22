import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { ClientComponent } from './client/client.component';
import { SaleComponent } from './sale/sale.component';
import { ProductComponent } from './product/product.component';

const APP_ROUTES: Routes = [
  { path: 'client', component: ClientComponent },
  { path: 'product', component: ProductComponent },
  { path: 'sale', component: SaleComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'client' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
