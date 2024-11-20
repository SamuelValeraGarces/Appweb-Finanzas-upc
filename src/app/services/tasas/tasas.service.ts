import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TasaDTO } from 'src/app/models/tasa-dto.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TasasService {
  private apiUrl = 'https://finanzasbackend-18vd.onrender.com/api/tasas'
  constructor(private http: HttpClient,  private authService: AuthService) { }
   // Obtener todas las tasas
 // Función para obtener los encabezados con el token de autorización
 private getAuthHeaders(): HttpHeaders {
  const token = this.authService.getToken(); // Obtener el token desde el servicio de autenticación
  let headers = new HttpHeaders();
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`); // Agregar el token en la cabecera
  }
  return headers;
}

// Obtener todas las tasas
getTasas(): Observable<TasaDTO[]> {
  return this.http.get<TasaDTO[]>(`${this.apiUrl}/get`, {
    headers: this.getAuthHeaders() // Agregar los encabezados de autorización
  });
}

// Obtener una tasa por su id
getTasa(id: number): Observable<TasaDTO> {
  return this.http.get<TasaDTO>(`${this.apiUrl}/${id}`, {
    headers: this.getAuthHeaders() // Agregar los encabezados de autorización
  });
}

// Registrar una nueva tasa
crearTasa(tasa: TasaDTO): Observable<void> {
  return this.http.post<void>(`${this.apiUrl}/register`, tasa, {
    headers: this.getAuthHeaders() // Agregar los encabezados de autorización
  });
}

// Modificar una tasa existente
modificarTasa(id: number, tasa: TasaDTO): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}`, tasa, {
    headers: this.getAuthHeaders() // Agregar los encabezados de autorización
  });
}

// Eliminar una tasa por su id
eliminarTasa(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`, {
    headers: this.getAuthHeaders() // Agregar los encabezados de autorización
  });
}
}
