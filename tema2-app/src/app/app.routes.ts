import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Usuarios } from './features/usuarios/usuarios';
import { Bienvenida } from './features/bienvenida/bienvenida';
import { Contador } from './features/contador/contador';
import { Tareas } from './features/tareas/tareas';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'usuarios', component: Usuarios },
  { path: 'bienvenida', component: Bienvenida },
  { path: 'contador', component: Contador },
  { path: 'tareas', component: Tareas }
];
