import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'https://localhost:44322/Api';
  constructor(private http: HttpClient) {}

  getAllProductDetails(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/AllProductDetails');
  }
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(
      this.url + '/GetProductDetailsById/' + productId
    );
  }
  createProduct(product: Product): Observable<Product> {
    console.log(product);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Product>(
      this.url + '/InsertProductDetails/',
      product,
      httpOptions
    );
  }
  updateProduct(product: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put<Product>(
      this.url + '/UpdateProductDetails/',
      product,
      httpOptions
    );
  }
  deleteProductById(productId: string): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.delete<number>(
      this.url + '/DeleteProductDetails?id=' + productId,
      httpOptions
    );
  }
}
