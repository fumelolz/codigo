import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  title = 'Información del Proyecto';
  
  contactForm = {
    name: '',
    email: '',
    feedback: ''
  };

  onSubmit() {
    console.log('Feedback del proyecto:', this.contactForm);
    alert('¡Gracias por tu feedback sobre el proyecto!');
    this.contactForm = { name: '', email: '', feedback: '' };
  }
}