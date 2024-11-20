import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacturaDTO } from 'src/app/models/factura-dto.model';
@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private apiURL = 'https://finanzasbackend-18vd.onrender.com/api/facturas';
  private reg = 'https://finanzasbackend-18vd.onrender.com/api/facturas/register';
  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Obtener el token desde AuthService
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`); // Agregar el token en la cabecera
    }
    return headers;
  }
    // Obtener todas las facturas
    getFacturas(): Observable<any[]> {
      return this.http.get<any[]>(this.apiURL, { headers: this.getAuthHeaders() }); // Solicitud GET con token
    }

    // Obtener facturas por ID de cartera
    getFacturasByCartera(idCartera: number): Observable<FacturaDTO[]> {
      return this.http.get<FacturaDTO[]>(`${this.apiURL}/cartera/${idCartera}`, { headers: this.getAuthHeaders() }); // Solicitud GET con token
    }

    // Crear una nueva factura
    crearFactura(factura: any): Observable<any> {
      return this.http.post<any>(this.reg, factura, { headers: this.getAuthHeaders() }); // Solicitud POST con token
    }

    // Modificar una factura
    modificarFactura(factura: FacturaDTO, id: number): Observable<any> {
      return this.http.put<any>(`${this.apiURL}/modificar/${id}`, factura, { headers: this.getAuthHeaders() }); // Solicitud PUT con token
    }

    // Eliminar una factura
    eliminarFactura(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiURL}/eliminar/${id}`, { headers: this.getAuthHeaders() }); // Solicitud DELETE con token
    }
}
