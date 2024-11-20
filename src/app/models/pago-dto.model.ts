export interface PagoDTO {
    id_pago: number;
    monto_pago: number;
    fecha_pago: string; // Puedes usar "Date" si prefieres trabajar con objetos Date
    id_factura: number;
  }
  