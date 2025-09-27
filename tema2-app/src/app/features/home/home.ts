import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  title = 'Aplicación Angular Unificada';
  description = 'Bienvenido a nuestra aplicación que integra múltiples funcionalidades';
  
  features = [
    {
      name: 'Bienvenida',
      description: 'Página de bienvenida con información actual',
      route: '/bienvenida'
    },
    {
      name: 'Usuarios',
      description: 'Gestión y administración de usuarios',
      route: '/usuarios'
    },
    {
      name: 'Contador',
      description: 'Contador interactivo con incremento/decremento',
      route: '/contador'
    },
    {
      name: 'Tareas',
      description: 'Lista de tareas con funcionalidad completa',
      route: '/tareas'
    },
    {
      name: 'Registro',
      description: 'Formulario de registro con validaciones',
      route: '/registro'
    }
  ];
}