import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarteraDTO } from 'src/app/models/cartera-dto.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarterasService {
  private apiURL = 'https://finanzasbackend-18vd.onrender.com/api/carteras/get';
  private reg = 'https://finanzasbackend-18vd.onrender.com/api/carteras/register';
  private usuariosURL = 'https://finanzasbackend-18vd.onrender.com/api/usuarios'; // Suponiendo que este es el endpoint para usuarios
  private tasasURL = 'https://finanzasbackend-18vd.onrender.com/api/tasas/get'; // Suponiendo que este es el endpoint para tasas
  private monedasURL = 'https://finanzasbackend-18vd.onrender.com/api/monedas/get'; // Suponiendo que este es el endpoint para monedas
  private baseUrl = 'https://finanzasbackend-18vd.onrender.com/api/carteras';
  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Obtener el token desde el servicio de autenticación
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`); // Agregar el token en la cabecera
    }
    return headers;
  }
  // Obtener las carteras
  getCarteras(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL, { headers: this.getAuthHeaders() }); // Agregar los encabezados de autorización
  }

  // Obtener los totales de una cartera por su id
  getTotalesCartera(idCartera: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${idCartera}/totales`, { headers: this.getAuthHeaders() });
  }

  // Obtener usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.usuariosURL, { headers: this.getAuthHeaders() });
  }

  // Obtener tasas
  getTasas(): Observable<any[]> {
    return this.http.get<any[]>(this.tasasURL, { headers: this.getAuthHeaders() });
  }

  // Obtener monedas
  getMonedas(): Observable<any[]> {
    return this.http.get<any[]>(this.monedasURL, { headers: this.getAuthHeaders() });
  }

  // Crear una nueva cartera
  crearCartera(cartera: any): Observable<any> {
    return this.http.post<any>(this.reg, cartera, { headers: this.getAuthHeaders() });
  }

  // Eliminar una cartera por su id
  eliminarCartera(idCartera: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminar/${idCartera}`, { headers: this.getAuthHeaders() });
  }

  // Modificar una cartera existente
  modificarCartera( cartera: CarteraDTO,idCartera: number,): Observable<any> {
  return this.http.put<void>(`${this.baseUrl}/modificar/${idCartera}`, cartera, { headers: this.getAuthHeaders() });
  }
}
