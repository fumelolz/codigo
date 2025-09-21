import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tareas',
  imports: [CommonModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.scss'
})
export class Tareas {
  tareas = [
    { texto: 'Estudiar Angular', done: true },
    { texto: 'Práctica de estilos', done: false },
  ];

  toggle(t: any) { 
    t.done = !t.done; 
  }
}
