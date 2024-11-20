export interface CarteraDTO {
    id_cartera: number;       // El ID de la cartera
    nombre_cartera: string;   // El nombre de la cartera
    fecha_descuento: string;   // La fecha de descuento (puedes cambiar a Date si prefieres)
    id_usuario: number;       // Relación con el usuario
    id_tasa: number;          // Relación con la tasa
    id_moneda: number;        // Relación con la moneda
  }