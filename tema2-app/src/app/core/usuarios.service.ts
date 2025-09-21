import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private api = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}
  listar(): Observable<any[]> { return this.http.get<any[]>(this.api); }
}
