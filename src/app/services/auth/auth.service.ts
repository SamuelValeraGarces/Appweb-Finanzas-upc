import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
interface AuthResponse {

  id_usuario: number;       // ID del usuario
  nombre_usuario: string;    // Nombre del usuario
  clave: string;             // Clave (aunque no suele enviarse en la respuesta de autenticación)
  token: string;
}
interface CredentialsDTO {
  nombre: string;
  clave: string;
}
interface RegisterDTO {
  nombre_usuario: string;
  clave: string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiURL = 'https://finanzasbackend-18vd.onrender.com/api/auth/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: CredentialsDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiURL, credentials).pipe(
      tap(authResult => {
        this.setSession(authResult);
      }),
      catchError(error => {
        console.error('Error en el inicio de sesión', error);
        return throwError(error);
      })
    );
  }

  registerUser(user: RegisterDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('https://finanzasbackend-18vd.onrender.com/api/auth/usuarios/register', user);
  }

  // Método para guardar el token en localStorage
  setSession(authResult: AuthResponse): void {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('userId', authResult.id_usuario.toString());
  }

  // Método para recuperar el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para verificar si el token ha expirado
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;  // Si no hay token, está expirado

    try {
      const decoded: any = jwtDecode(token); // Decodificamos el JWT
      const expirationTime = decoded.exp * 1000; // Expiración en milisegundos
      const currentTime = new Date().getTime(); // Hora actual en milisegundos

      return currentTime >= expirationTime; // Si la hora actual es mayor que la hora de expiración, el token ha expirado
    } catch (error) {
      console.error('Error decodificando el token', error);
      return true; // Si ocurre un error al decodificar, consideramos que el token ha expirado
    }
  }

  // Método para verificar si el usuario está autenticado (token válido)
  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired() : false; // Si token es null o vacío, devuelve false
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
