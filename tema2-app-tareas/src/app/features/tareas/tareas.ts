import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tareas',
  imports: [CommonModule, FormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.scss'
})
export class Tareas {
  tareas = [
    { texto: 'Estudiar Angular', done: true },
    { texto: 'Práctica de estilos', done: false },
  ];

  nuevaTarea = '';

  toggle(t: any) { 
    t.done = !t.done; 
  }

  agregarTarea() {
    if (this.nuevaTarea.trim()) {
      this.tareas.push({ texto: this.nuevaTarea.trim(), done: false });
      this.nuevaTarea = '';
    }
  }

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);
  }
}
