import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  url = 'https://localhost:44322/Api';
  constructor(private http: HttpClient) {}

  getAllClientDetails(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + '/AllClientDetails');
  }
  getClientById(clientId: string): Observable<Client> {
    return this.http.get<Client>(
      this.url + '/GetClientDetailsById/' + clientId
    );
  }
  createClient(client: Client): Observable<Client> {
    console.log(client);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Client>(
      this.url + '/InsertClientDetails/',
      client,
      httpOptions
    );
  }
  updateClient(client: Client): Observable<Client> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put<Client>(
      this.url + '/UpdateClientDetails/',
      client,
      httpOptions
    );
  }
  deleteClientById(clientId: string): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.delete<number>(
      this.url + '/DeleteClientDetails?id=' + clientId,
      httpOptions
    );
  }
}
