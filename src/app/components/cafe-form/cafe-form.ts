// src/app/components/cafe-form/cafe-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)] [cite: 1501, 1506]
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';
import { Tipo } from '../../interfaces/tipo.interface';
import { CreateCafeDto } from '../../interfaces/create-cafe.dto';

@Component({
  selector: 'app-cafe-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cafe-form.html',
  styleUrls: ['./cafe-form.css']
})
export class CafeFormComponent implements OnInit {
  // Modelo del formulario
  cafe: CreateCafeDto = {
    name: '',
    description: '',
    tipoId: 0
  };

  tipos: Tipo[] = []; // Para llenar el select
  esEdicion: boolean = false;
  idCafeEditar: number | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute // Para leer la URL
  ) {}

  ngOnInit(): void {
    // 1. Cargar los tipos para el desplegable
    this.apiService.getTipos().subscribe(data => this.tipos = data);

    // 2. Verificar si estamos editando (¿hay un ID en la URL?)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.esEdicion = true;
        this.idCafeEditar = +id;
        this.cargarCafeParaEditar(this.idCafeEditar);
      }
    });
  }

  cargarCafeParaEditar(id: number) {
    this.apiService.getCafeById(id).subscribe(data => {
      // Rellenamos el formulario con los datos que vinieron de la API
      this.cafe = {
        name: data.name,
        description: data.description,
        tipoId: data.tipo.id // Importante: Asignar el ID del tipo
      };
    });
  }

  guardarCafe(): void {
    if (this.esEdicion && this.idCafeEditar) {
      // ACTUALIZAR (PATCH)
      this.apiService.updateCafe(this.idCafeEditar, this.cafe).subscribe(() => {
        this.router.navigate(['/cafes']); // Volver a la lista
      });
    } else {
      // CREAR (POST)
      this.apiService.createCafe(this.cafe).subscribe(() => {
        this.router.navigate(['/cafes']); // Volver a la lista
      });
    }
  }
}