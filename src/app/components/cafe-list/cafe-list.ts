// src/app/components/cafe-list/cafe-list.component.ts
import { Component, OnInit } from '@angular/core'; // Importar OnInit
import { ApiService } from '../../services/api'; // Importar nuestro servicio
import { Cafe } from '../../interfaces/cafe.interface'; // Importar la interface Cafe
import { Tipo } from '../../interfaces/tipo.interface'; // Importar la interface Tipo
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-cafe-list', // Este es el nombre de la etiqueta HTML
  standalone: true, // Indica que es un componente Standalone
  imports: [CommonModule], // Importar CommonModule para usar *ngFor y *ngIf
  templateUrl: './cafe-list.html',
  styleUrls: ['./cafe-list.css']
})
export class CafeListComponent implements OnInit { // Implementar OnInit

  // Variables para guardar los datos
  cafes: Cafe[] = [];
  tipos: Tipo[] = [];
  
  // 1. Inyectar el servicio en el constructor (Inyección de Dependencias)
  constructor(private apiService: ApiService) { }

  // 2. ngOnInit se ejecuta cuando el componente está listo
  ngOnInit(): void {
    this.cargarCafes();
    this.cargarTipos();
  }

  // 3. Método para cargar los cafés
  cargarCafes(): void {
    // Llamamos al servicio y nos "suscribimos" al Observable
    this.apiService.getCafes({}).subscribe(data => {
      this.cafes = data; // Guardamos los datos en nuestra variable
      console.log('Cafés cargados:', this.cafes);
    });
  }

  // 4. Método para cargar los tipos (útil para filtros futuros)
  cargarTipos(): void {
    this.apiService.getTipos().subscribe(data => {
      this.tipos = data;
      console.log('Tipos cargados:', this.tipos);
    });
  }
}
