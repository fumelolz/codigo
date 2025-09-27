import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../core/usuarios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class Usuarios implements OnInit {
  usuarios: any[] = [];
  error = '';
  selectedUser: any = null;
  
  constructor(private srv: UsuariosService) { }
  
  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.error = '';
    this.srv.listar().subscribe({
      next: u => this.usuarios = u,
      error: _ => this.error = 'No se pudo cargar usuarios'
    });
  }
}
