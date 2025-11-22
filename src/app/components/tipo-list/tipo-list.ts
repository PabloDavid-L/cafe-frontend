import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';
import { Tipo } from '../../interfaces/tipo.interface';

@Component({
  selector: 'app-tipo-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tipo-list.html',
  styleUrls: ['./tipo-list.css']
})
export class TipoListComponent implements OnInit {
  tipos: Tipo[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarTipos();
  }

  cargarTipos() {
    this.apiService.getTipos().subscribe(data => {
      this.tipos = data;
    });
  }

  borrarTipo(id: number) {
    if(confirm('¿Seguro que querés borrar este tipo?')) {
      this.apiService.deleteTipo(id).subscribe(() => {
        this.cargarTipos(); // Recargar la lista
      });
    }
  }
}
