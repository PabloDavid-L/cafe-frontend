// src/app/components/cafe-list/cafe-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { Cafe } from '../../interfaces/cafe.interface';
import { Tipo } from '../../interfaces/tipo.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// --- 1. Importar el nuevo componente ---
import { TipoSelectorComponent } from '../tipo-selector/tipo-selector';

@Component({
  selector: 'app-cafe-list',
  standalone: true,
  // --- 2. Añadir TipoSelectorComponent a los imports ---
  imports: [CommonModule, TipoSelectorComponent, RouterModule],
  templateUrl: './cafe-list.html',
  styleUrls: ['./cafe-list.css']
})
export class CafeListComponent implements OnInit {

  cafes: Cafe[] = [];
  tipos: Tipo[] = []; // Ya no necesitamos 'tipos' aquí, el selector lo maneja
  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Carga inicial (todos los cafés)
    this.cargarCafes(); 
  }

  // --- 3. Modificar cargarCafes para aceptar filtros ---
  cargarCafes(filtros: { tipoId?: number } = {}): void {
    
    // Preparamos los parámetros para el QueryDTO del backend
    const params: any = {
      limit: 20, // Podés poner los defaults que quieras
      page: 1,
    };

    if (filtros.tipoId) {
      params.tipoId = filtros.tipoId;
    }

    // Llamamos al servicio con los filtros
    this.apiService.getCafes(params).subscribe(data => {
      this.cafes = data;
      console.log('Cafés cargados:', this.cafes);
    });
  }

  borrarCafe(id: number): void {
    if (confirm('¿Estás seguro de eliminar este café?')) {
      this.apiService.deleteCafe(id).subscribe(() => {
        // Actualizamos la lista después de borrar
        this.cargarCafes(); 
      });
    }
  }

  // --- 4. Método que recibe el evento del componente hijo ---
  onTipoFiltrado(tipoId: number | null): void {
    if (tipoId) {
      // Si recibimos un ID, filtramos
      this.cargarCafes({ tipoId: tipoId });
    } else {
      // Si recibimos null (clic en "Mostrar Todos"), cargamos sin filtro
      this.cargarCafes();
    }
  }
}
