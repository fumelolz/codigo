import { Routes } from '@angular/router';
import { Usuarios } from './features/usuarios/usuarios';

export const routes: Routes = [
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: Usuarios }
];
