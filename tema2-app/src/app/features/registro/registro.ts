import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class Registro {
  form;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit(){
    if(this.form.invalid) return;
    console.log('Datos del formulario:', this.form.value);
    // Simular POST y limpiar
    alert('¡Registro exitoso! Los datos se han enviado correctamente.');
    this.form.reset();
  }
}