import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Bienvenida } from './features/bienvenida/bienvenida';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Bienvenida],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tema2-app-bienvenida');
}
