import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Usuarios } from './features/usuarios/usuarios';
import { Bienvenida } from './features/bienvenida/bienvenida';
import { Contador } from './features/contador/contador';
import { Tareas } from './features/tareas/tareas';
import { Registro } from './features/registro/registro';
// Importar los nuevos componentes de páginas
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';
import { UserDetailComponent } from './pages/user-detail/user-detail';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'dashboard', component: Home },
  { path: 'usuarios', component: Usuarios },
  { path: 'bienvenida', component: Bienvenida },
  { path: 'contador', component: Contador },
  { path: 'tareas', component: Tareas },
  { path: 'registro', component: Registro },
  { path: '**', component: NotFoundComponent }
];
