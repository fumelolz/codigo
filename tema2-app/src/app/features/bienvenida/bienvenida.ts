import { Component } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  imports: [],
  templateUrl: './bienvenida.html',
  styleUrl: './bienvenida.scss'
})
export class Bienvenida {
  mensaje = '¡Hola! Bienvenido a nuestra aplicación Angular';
  fechaActual = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}