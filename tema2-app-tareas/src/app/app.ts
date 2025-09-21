import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tareas } from './features/tareas/tareas';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Tareas],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tema2-app-tareas');
}
