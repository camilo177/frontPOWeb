import { Component } from '@angular/core';
import { ApiConection } from "../Shared/ApiConection";
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from "primeng/api";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MenubarModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  formParqueadero: FormGroup;
  items: MenuItem[] | undefined;
  parqueaderos: any[] = [];
  verFormParqueadero: boolean = false;
  selectedParqueadero: any = {};

  constructor(private api: ApiConection, private fb: FormBuilder) {
    this.api.token = localStorage.getItem('token');
    this.formParqueadero = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      nit: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home'
      },
    ];
    this.listaParqueaderos();
  }

  listaParqueaderos() {
    this.api.get('parqueadero')
      .subscribe(data => {
        this.parqueaderos = data;
      });
  }

  accionFormularioParqueadero() {
    if (this.formParqueadero.value['id']) {
      this.updateParqueadero();
    } else {
      this.addParqueadero();
    }
  }

  addParqueadero() {
    this.api.add('parqueadero/', this.formParqueadero.value)
      .subscribe(() => {
        this.listaParqueaderos();
        this.verFormParqueadero = false;
        this.formParqueadero.reset();
      });
  }

  updateParqueadero() {
    this.api.update('parqueadero', this.formParqueadero.value, this.selectedParqueadero.id)
      .subscribe(() => {
        this.listaParqueaderos();
        this.verFormParqueadero = false;
        this.formParqueadero.reset();
      });
  }

  editParqueadero(parqueadero: any) {
    this.selectedParqueadero = parqueadero;
    this.formParqueadero.patchValue(parqueadero); // Populate form with selected data
    this.verFormParqueadero = true;
  }

  deleteParqueadero(parqueadero: any) {
    if (confirm('¿Está seguro de que desea eliminar este parqueadero?')) {
      this.api.delete('parqueadero', parqueadero.id).subscribe(() => {
        this.listaParqueaderos(); // Refresh the list after deletion
      });
    }
  }

  cancel() {
    this.formParqueadero.reset();
    this.verFormParqueadero = false;
    this.selectedParqueadero = {};
  }
}
