import { Routes } from '@angular/router';
import { CafeListComponent } from './components/cafe-list/cafe-list';

export const routes: Routes = [
  // Si la ruta está vacía (''), redirige a '/cafes'
  { path: '', redirectTo: 'cafes', pathMatch: 'full' }, 
  
  // Cuando la URL sea '/cafes', carga CafeListComponent
  { path: 'cafes', component: CafeListComponent } 
  
  // Aquí podrías agregar más rutas después, ej:
  // { path: 'cafes/:id', component: CafeDetailComponent }
];