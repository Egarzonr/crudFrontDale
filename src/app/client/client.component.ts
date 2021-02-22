import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  dataSaved = false;
  clientForm: any;
  allClients: Observable<Client[]>;
  clientIdUpdate = null;
  message = null;

  constructor(private clientservice: ClientService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clientNumber: ['', [Validators.required]],
      clientName: ['', [Validators.required]],
      clientSurname: ['', [Validators.required]],
      clientPhone: ['', [Validators.required]],
    });

    this.loadAllClients();
  }

  loadAllClients() {
    this.allClients = this.clientservice.getAllClientDetails();
  }
  onFormSubmit() {
    this.dataSaved = false;
    const client = this.clientForm.value;
    console.log(client);
    this.CreateClient(client);
    this.clientForm.reset();
  }

  loadClientToEdit(clientId: string) {
    this.clientservice.getClientById(clientId).subscribe((client) => {
      this.message = null;
      this.dataSaved = false;
      this.clientIdUpdate = client.clientId;
      this.clientForm.controls.clientName.setValue(client.clientName);
      this.clientForm.controls.clientSurname.setValue(client.clientSurname);
      this.clientForm.controls.clientNumber.setValue(client.clientNumber);
      this.clientForm.controls.clientPhone.setValue(client.clientPhone);
    });
  }

  CreateClient(client: Client) {
    if (this.clientIdUpdate == null) {
      this.clientservice.createClient(client).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Registro Guardado Satisfactoriamente';
        this.loadAllClients();
        this.clientIdUpdate = null;
        this.clientForm.reset();
      });
    } else {
      client.clientId = this.clientIdUpdate;
      this.clientservice.updateClient(client).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Registro Actualizado Satisfactoriamente';
        this.loadAllClients();
        this.clientIdUpdate = null;
        this.clientForm.reset();
      });
    }
  }

  deleteClient(clientId: string) {
    if (confirm('Esta seguro de borrar el registro ?')) {
      this.clientservice.deleteClientById(clientId).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Registro Borrado Satisfactoriamente';
        this.loadAllClients();
        this.clientIdUpdate = null;
        this.clientForm.reset();
      });
    }
  }

  resetForm() {
    this.clientForm.reset();
    this.message = null;
    this.dataSaved = false;
  }
}
