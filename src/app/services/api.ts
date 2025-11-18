// src/app/services/api.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Importa las interfaces que definimos
import { Cafe } from '../interfaces/cafe.interface';
import { Tipo } from '../interfaces/tipo.interface';
import { CreateCafeDto } from '../interfaces/create-cafe.dto';
import { CreateTipoDto } from '../interfaces/create-tipo.dto';
import { UpdateTipoDto } from '../interfaces/update-tipo.dto';

// La URL de tu API de NestJS (la "cocina" que corre en el puerto 3000)
const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService { // El nombre de la clase es ApiService

  // Inyectamos el HttpClient de Angular
  constructor(private http: HttpClient) { }

  // --- MÉTODOS DE TIPOS ---

  /** Obtiene todos los tipos */
  getTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${API_URL}/tipos`);
  }

  /** Obtiene un tipo por su ID */
  getTipoById(id: number): Observable<Tipo> {
    return this.http.get<Tipo>(`${API_URL}/tipos/${id}`);
  }

  /** Crea un nuevo tipo */
  createTipo(tipo: CreateTipoDto): Observable<Tipo> {
    return this.http.post<Tipo>(`${API_URL}/tipos`, tipo);
  }

  /** Actualiza un tipo existente */
  updateTipo(id: number, tipo: UpdateTipoDto): Observable<Tipo> {
    return this.http.patch<Tipo>(`${API_URL}/tipos/${id}`, tipo);
  }

  /** Elimina un tipo por su ID */
  deleteTipo(id: number): Observable<Tipo> {
    return this.http.delete<Tipo>(`${API_URL}/tipos/${id}`);
  }

  // --- MÉTODOS DE CAFES ---

  /** Obtiene cafés con filtros, paginación y ordenamiento (usando tipoId) */
  getCafes(params: {
    tipoId?: number,
    description?: string,
    page?: number,
    limit?: number,
    sortBy?: string,
    orderBy?: 'ASC' | 'DESC'
  }): Observable<Cafe[]> {
    
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      // Solo añadimos el parámetro si tiene un valor
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    // Envía la petición a GET /cafes con los parámetros de consulta
    return this.http.get<Cafe[]>(`${API_URL}/cafes`, { params: httpParams });
  }

  /** Obtiene un café por su ID */
  getCafeById(id: number): Observable<Cafe> {
    return this.http.get<Cafe>(`${API_URL}/cafes/${id}`);
  }

  /** Crea un nuevo café (usando DTO con tipoId) */
  createCafe(cafeDto: CreateCafeDto): Observable<Cafe> {
    return this.http.post<Cafe>(`${API_URL}/cafes`, cafeDto);
  }

  /** Actualiza un café existente (usando DTO con tipoId opcional) */
  updateCafe(id: number, cafeDto: Partial<CreateCafeDto>): Observable<Cafe> {
    return this.http.patch<Cafe>(`${API_URL}/cafes/${id}`, cafeDto);
  }

  /** Elimina un café por su ID */
  deleteCafe(id: number): Observable<Cafe> {
    return this.http.delete<Cafe>(`${API_URL}/cafes/${id}`);
  }
}