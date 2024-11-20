export interface FacturaDTO {
    id_factura: number;
    nombre_factura: string;
    valor_nominal: number;

    fecha_emision: string; // Puede ser tipo Date si prefieres usar objetos Date
    fecha_vencimiento: string;
   
    estado_factura: boolean; // Considerando que se guarda como String
    id_cartera: number;
    tasa_efectiva: number;
    tasa_descontada: number;
    descuento: number;
    valor_neto: number;
    valor_recibido: number;
    valor_entregado: number;
  }
  