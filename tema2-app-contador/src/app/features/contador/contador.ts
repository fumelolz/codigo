import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contador',
  imports: [FormsModule],
  templateUrl: './contador.html',
  styleUrl: './contador.scss'
})
export class Contador {
  valor = 0;
  paso = 1;

  inc() { 
    this.valor += this.paso; 
  }

  dec() { 
    this.valor -= this.paso; 
  }
}
