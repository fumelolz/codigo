import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User, UserLogin, UserRegistration, AuthResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';

  constructor() {
    // Check if user is already logged in
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem(this.userKey);
    const token = localStorage.getItem(this.tokenKey);
    
    if (storedUser && token) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: UserLogin): Observable<AuthResponse> {
    // Simulate API call
    return of({
      user: {
        id: '1',
        email: credentials.email,
        name: 'Usuario Demo',
        createdAt: new Date()
      },
      token: 'fake-jwt-token-' + Date.now()
    }).pipe(
      delay(1000), // Simulate network delay
      map(response => {
        this.setAuthData(response);
        return response;
      })
    );
  }

  register(userData: UserRegistration): Observable<AuthResponse> {
    // Simulate API call
    return of({
      user: {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        createdAt: new Date()
      },
      token: 'fake-jwt-token-' + Date.now()
    }).pipe(
      delay(1000), // Simulate network delay
      map(response => {
        this.setAuthData(response);
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error('No user logged in');
    }

    const updatedUser = { ...currentUser, ...userData };
    
    return of(updatedUser).pipe(
      delay(500),
      map(user => {
        this.currentUserSubject.next(user);
        localStorage.setItem(this.userKey, JSON.stringify(user));
        return user;
      })
    );
  }

  private setAuthData(authResponse: AuthResponse): void {
    localStorage.setItem(this.tokenKey, authResponse.token);
    localStorage.setItem(this.userKey, JSON.stringify(authResponse.user));
    this.currentUserSubject.next(authResponse.user);
  }
}