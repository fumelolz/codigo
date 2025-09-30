import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
  title = 'Acerca del Proyecto';
  description = 'Este es un proyecto educativo de Angular que demuestra conceptos fundamentales del framework';
  
  technologies = [
    { name: 'Angular 19', description: 'Framework principal' },
    { name: 'TypeScript', description: 'Lenguaje de programación' },
    { name: 'RxJS', description: 'Programación reactiva' },
    { name: 'Angular Router', description: 'Sistema de navegación' }
  ];
}