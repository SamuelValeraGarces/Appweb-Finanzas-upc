import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/services/facturas/facturas.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CarterasService } from 'src/app/services/carteras/carteras.service';
import { FacturaDTO } from 'src/app/models/factura-dto.model';
import { DatePipe } from '@angular/common';
import { privateDecrypt } from 'crypto';
import { Location } from '@angular/common';
import { MonedasService } from 'src/app/services/monedas/monedas.service';
@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  facturas: FacturaDTO[] = [];
  idCartera! : number;
  totalCartera: any;
  simboloMoneda: string = '';
  nuevaFactura = {
    nombre_factura: '',
    valor_nominal: 0,
    fecha_emision: '' as string | null,
    fecha_vencimiento: '' as string | null,
    estado_factura: true,
    id_cartera: 0
  };
  
  mostrarFormulario: boolean = false;
  estadoFacturaTexto: string = 'No pagado'; 
  facturaSeleccionada: FacturaDTO | null = null;
  facturaParaEditar: FacturaDTO | null = null;
  constructor(
    private route: ActivatedRoute,
    private facturaService: FacturasService,
    private datePipe: DatePipe,
    private router: Router,
    private carteraService: CarterasService,
    private location: Location,
    private monedaService: MonedasService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idCartera = +params['idCartera']; // Obtener el id de la cartera desde la ruta
      console.log('ID de Cartera:', this.idCartera); 
      this.loadFacturas();
      this.loadTotalesCartera();
      this.obtenerSimboloMoneda();
    });
  }
// En facturas.component.ts
obtenerSimboloMoneda(): void {
  this.monedaService.obtenerSimboloPorCarteraId(this.idCartera).subscribe(
    (response: string) => {
      console.log('Respuesta del símbolo de la moneda:', response);
      this.simboloMoneda = response;  // Asigna el valor directamente
    },
    (error) => {
      console.error('Error al obtener el símbolo de la moneda', error);
    }
  );
}

  
  retroceder() {
    this.location.back();
  }
  loadFacturas(): void {
    this.facturaService.getFacturasByCartera(this.idCartera).subscribe(
      (response: FacturaDTO[]) => {
        this.facturas = response.map(factura => {
          // Convertir las fechas al formato ISO antes de usar DatePipe
          factura.fecha_emision = this.convertirFechaAFormatoISO(factura.fecha_emision);
          factura.fecha_vencimiento = this.convertirFechaAFormatoISO(factura.fecha_vencimiento);
          
          return factura;
        });
        this.loadTotalesCartera();
      },
      error => {
        console.error('Error al cargar las facturas', error);
      }
    );
  }
  loadTotalesCartera(): void {
    this.carteraService.getTotalesCartera(this.idCartera).subscribe(
      (totales) => {
        this.totalCartera = totales;  // Asignamos los totales recibidos
      },
      (error) => {
        console.error('Error al cargar los totales de la cartera', error);
      }
    );
  }

  // Mostrar el formulario para registrar una nueva factura
  mostrarFormularioRegistro(): void {
    this.mostrarFormulario = true;
    this.facturaSeleccionada = null;
  }

  // Registrar la nueva factura
  registrarFactura(): void {
    // Validar que todos los campos requeridos estén completos
    if (!this.nuevaFactura.nombre_factura || this.nuevaFactura.valor_nominal <= 0 || !this.nuevaFactura.fecha_emision || !this.nuevaFactura.fecha_vencimiento) {
      alert('Por favor, complete todos los campos antes de registrar la factura.');
      return; // No continuar con el registro si falta algún campo
    }
  
    // Convertir las fechas al formato ISO "yyyy-MM-dd"
    const fechaEmisionFormateada = this.convertirFechaAFormatoISO(this.nuevaFactura.fecha_emision);
    const fechaVencimientoFormateada = this.convertirFechaAFormatoISO(this.nuevaFactura.fecha_vencimiento);
    
    // Asignar las fechas convertidas y el id_cartera
    this.nuevaFactura.fecha_emision = fechaEmisionFormateada;
    this.nuevaFactura.fecha_vencimiento = fechaVencimientoFormateada;
    this.nuevaFactura.id_cartera = this.idCartera;
    
    // Convertir estado_factura a booleano según la opción seleccionada
    this.nuevaFactura.estado_factura = this.estadoFacturaTexto === 'No pagado';
    
    // Enviar los datos al backend
    this.facturaService.crearFactura(this.nuevaFactura).subscribe(
      response => {
        console.log('Factura registrada con éxito', response);
        this.loadFacturas(); // Recargar las facturas
        this.mostrarFormulario = false; // Cerrar el formulario
  
        // Limpiar el formulario para la próxima factura
        this.nuevaFactura = {
          nombre_factura: '',
          valor_nominal: 0,
          fecha_emision: '' as string | null,
          fecha_vencimiento: '' as string | null,
          estado_factura: true,
          id_cartera: 0
        };
      },
      error => {
        console.error('Error al registrar la factura', error);
      }
    );
  }
  
  

  // Convertir la fecha a formato ISO "yyyy-MM-dd"
  convertirFechaAFormatoISO(fecha: string | null): string {
    if (!fecha) return '';
    const [day, month, year] = fecha.split('-');
    return `${year}-${month}-${day}`;
  }

  // Mostrar las fechas en el formato deseado en la interfaz
  obtenerFechaFormateada(fecha: string): string {
    const fechaISO = this.convertirFechaAFormatoISO(fecha);
    return this.datePipe.transform(fechaISO, 'dd-MM-yyyy')!;
  }

  cambiarEstadoFactura(): void {
    this.estadoFacturaTexto = this.estadoFacturaTexto === 'No pagado' ? 'Pagado' : 'No pagado';
  }

  verFactura(idFactura: number): void {
    this.router.navigate(['/factura', idFactura]); // Redirigir al componente Factura con el ID de la factura
  }

  irAGastos(idFactura: number): void {
    this.router.navigate(['/gasto', idFactura]);
  }

  actualizarFactura(): void {
    // Convertir las fechas al formato ISO "yyyy-MM-dd"
    const fechaEmisionFormateada = this.convertirFechaAFormatoISO(this.facturaSeleccionada!.fecha_emision);
    const fechaVencimientoFormateada = this.convertirFechaAFormatoISO(this.facturaSeleccionada!.fecha_vencimiento);

    // Asignar las fechas convertidas y el id_cartera
    this.facturaSeleccionada!.fecha_emision = fechaEmisionFormateada;
    this.facturaSeleccionada!.fecha_vencimiento = fechaVencimientoFormateada;
    this.facturaSeleccionada!.id_cartera = this.idCartera;

    // Convertir estado_factura a booleano según la opción seleccionada
    this.facturaSeleccionada!.estado_factura = this.estadoFacturaTexto === 'No pagado';

    // Enviar los datos al backend
    this.facturaService.modificarFactura(this.facturaSeleccionada!, this.facturaSeleccionada!.id_factura).subscribe(
      response => {
        console.log('Factura modificada con éxito', response);
        this.loadFacturas(); // Recargar las facturas después de la modificación
        this.mostrarFormulario = false; // Cerrar el formulario
      },
      error => {
        console.error('Error al modificar la factura', error);
      }
    );
  }

  modificarFactura(factura: FacturaDTO): void {
    this.facturaSeleccionada = factura;
    this.nuevaFactura = { ...factura };  // Cargar los datos de la factura en el formulario
    this.mostrarFormulario = true;  // Mostrar el formulario para editar
  }

  eliminarFactura(id: number): void {
    this.facturaService.eliminarFactura(id).subscribe(
      response => {
        console.log('Factura eliminada con éxito', response);
        this.loadFacturas(); 
        this.loadTotalesCartera();// Recargar las facturas después de eliminar
      },
      error => {
        console.error('Error al eliminar la factura', error);
      }
    );
  }
}