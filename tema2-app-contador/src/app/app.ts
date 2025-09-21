import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contador } from './features/contador/contador';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Contador],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tema2-app-contador');
}
