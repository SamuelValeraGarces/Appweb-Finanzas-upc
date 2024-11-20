import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GastoDTO } from 'src/app/models/gasto-dto.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private baseUrl = 'https://finanzasbackend-18vd.onrender.com/api/gastos';
  private url = 'https://finanzasbackend-18vd.onrender.com/api';
  constructor(private http: HttpClient, private authService: AuthService) { }
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Obtener el token desde el servicio de autenticación
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`); // Agregar el token en la cabecera
    }
    return headers;
  }
      // Obtener gastos por id de factura
  getGastosByFacturaId(idFactura: number): Observable<GastoDTO[]> {
    return this.http.get<GastoDTO[]>(`${this.baseUrl}/factura/${idFactura}`, {
      headers: this.getAuthHeaders() // Agregar los encabezados de autorización
    });
  }

  // Crear un nuevo gasto para una factura
  crearGasto(idFactura: number, gasto: GastoDTO): Observable<GastoDTO> {
    const url = `${this.url}/facturas/${idFactura}/gastos`;
    return this.http.post<GastoDTO>(url, gasto, {
      headers: this.getAuthHeaders() // Agregar los encabezados de autorización
    });
  }

  // Modificar un gasto existente
  modificarGasto(idGasto: number, gasto: GastoDTO): Observable<GastoDTO> {
    return this.http.put<GastoDTO>(`${this.baseUrl}/actualizar/${idGasto}`, gasto, {
      headers: this.getAuthHeaders() // Agregar los encabezados de autorización
    });
  }

  // Eliminar un gasto
  eliminarGasto(idGasto: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminar/${idGasto}`, {
      headers: this.getAuthHeaders() // Agregar los encabezados de autorización
    });
  }
}
