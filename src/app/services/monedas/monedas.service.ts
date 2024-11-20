import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonedaDTO } from 'src/app/models/moneda-dto.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MonedasService {
  private apiUrl = `https://finanzasbackend-18vd.onrender.com/api/monedas`;
  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Obtener el token desde el servicio de autenticación
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`); // Agregar el token en la cabecera
    }
    return headers;
  }

  getMonedas(): Observable<MonedaDTO[]> {
    return this.http.get<MonedaDTO[]>(`${this.apiUrl}/get`, {
      headers: this.getAuthHeaders() // Agregar los encabezados de autorización
    });
  }

  getMoneda(id: number): Observable<MonedaDTO> {
    return this.http.get<MonedaDTO>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders() // Agregar los encabezados de autorización
    });
  }

  crearMoneda(moneda: MonedaDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, moneda, {
      headers: this.getAuthHeaders() // Agregar los encabezados de autorización
    });
  }

  modificarMoneda(id: number, moneda: MonedaDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, moneda, {
      headers: this.getAuthHeaders() // Agregar los encabezados de autorización
    });
  }

  eliminarMoneda(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`, {
      headers: this.getAuthHeaders() // Agregar los encabezados de autorización
    });
  }

  obtenerSimboloPorCarteraId(idCartera: number) {
    return this.http.get<string>(`https://finanzasbackend-18vd.onrender.com/api/monedas/simbolo/${idCartera}`, {
      responseType: 'text' as 'json',
      headers: this.getAuthHeaders() // Agregar los encabezados de autorización
    });
  }
}
