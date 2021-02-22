import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  url = 'https://localhost:44322/Api';
  constructor(private http: HttpClient) {}

  getAllSaleDetails(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.url + '/AllSaleDetails');
  }
  getSaleById(saleId: string): Observable<Sale> {
    return this.http.get<Sale>(this.url + '/GetSaleDetailsById/' + saleId);
  }
  createSale(sale: Sale): Observable<Sale> {
    console.log(sale);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Sale>(
      this.url + '/InsertSaleDetails/',
      sale,
      httpOptions
    );
  }
  updateSale(sale: Sale): Observable<Sale> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put<Sale>(
      this.url + '/UpdateSaleDetails/',
      sale,
      httpOptions
    );
  }
  deleteSaleById(saleId: string): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.delete<number>(
      this.url + '/DeleteSaleDetails?id=' + saleId,
      httpOptions
    );
  }
}
