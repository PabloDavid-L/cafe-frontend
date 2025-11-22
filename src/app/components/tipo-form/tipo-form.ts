import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';
import { CreateTipoDto } from '../../interfaces/create-tipo.dto';

@Component({
  selector: 'app-tipo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tipo-form.html',
  styleUrls: ['./tipo-form.css']
})
export class TipoFormComponent implements OnInit {
  // Modelo para el formulario
  tipo: CreateTipoDto = {
    name: '',
    description: ''
  };

  esEdicion = false;
  idTipoEditar: number | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Chequear si hay un ID en la URL (modo edición)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.esEdicion = true;
        this.idTipoEditar = +id;
        // Cargar datos del tipo para editar
        this.apiService.getTipoById(this.idTipoEditar).subscribe(data => {
          this.tipo = { name: data.name, description: data.description };
        });
      }
    });
  }

  guardarTipo() {
    if (this.esEdicion && this.idTipoEditar) {
      // Editar
      this.apiService.updateTipo(this.idTipoEditar, this.tipo).subscribe(() => {
        this.router.navigate(['/tipos']);
      });
    } else {
      // Crear
      this.apiService.createTipo(this.tipo).subscribe(() => {
        this.router.navigate(['/tipos']);
      });
    }
  }
}