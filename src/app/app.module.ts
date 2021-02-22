import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { ClientService } from './services/client.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { SaleComponent } from './sale/sale.component';

@NgModule({
  declarations: [AppComponent, ClientComponent, ProductComponent, SaleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [HttpClientModule, ClientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
