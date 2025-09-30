export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface UserRegistration {
  email: string;
  password: string;
  name: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}