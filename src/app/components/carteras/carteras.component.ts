import { Component, OnInit } from '@angular/core';
import { CarterasService } from '../../services/carteras/carteras.service'; // Asegúrate de que esta ruta sea correcta
import { CarteraDTO } from 'src/app/models/cartera-dto.model';
import { UsuarioDTO } from 'src/app/models/usuario-dto.model';
import { TasaDTO } from 'src/app/models/tasa-dto.model';
import { MonedaDTO } from 'src/app/models/moneda-dto.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FacturasService } from '../../services/facturas/facturas.service';  // Importar el servicio de facturas
import { GastosService } from '../../services/gastos/gastos.service';  
@Component({
  selector: 'app-carteras',
  templateUrl: './carteras.component.html',
  styleUrls: ['./carteras.component.css']
})
export class CarterasComponent implements OnInit {
  carteras: any[] = [];
  usuarios: UsuarioDTO[] = [];
  tasas: TasaDTO[] = [];
  monedas: MonedaDTO[] = [];
  carteraEditar: CarteraDTO | null = null;
  nuevaCartera = {
    nombre_cartera: '',
    fecha_descuento: '',  // Cambiado a solo string
    id_usuario: null,
    id_tasa: null,
    id_moneda: null
  };
  mostrarFormulario: boolean = false;

  constructor(
    private carteraService: CarterasService,
    private datePipe: DatePipe,
    private router: Router,
    private location: Location,
    private facturaService: FacturasService,  // Inyectar el servicio de facturas
    private gastoService: GastosService, 
  ) { }

  ngOnInit(): void {
    this.loadCarteras();
    this.loadUsuarios();
    this.loadTasas();
    this.loadMonedas();
  }

  loadCarteras(): void {
    this.carteraService.getCarteras().subscribe(
      response => {
        this.carteras = response;
      },
      error => {
        console.error('Error al cargar carteras', error);
      }
    );
  }

  retroceder(): void {
    this.location.back();
  }

  loadUsuarios(): void {
    this.carteraService.getUsuarios().subscribe(
      response => {
        this.usuarios = response;
      },
      error => {
        console.error('Error al cargar usuarios', error);
      }
    );
  }

  loadTasas(): void {
    this.carteraService.getTasas().subscribe(
      response => {
        this.tasas = response;
      },
      error => {
        console.error('Error al cargar tasas', error);
      }
    );
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  loadMonedas(): void {
    this.carteraService.getMonedas().subscribe(
      response => {
        this.monedas = response;
      },
      error => {
        console.error('Error al cargar monedas', error);
      }
    );
  }

  // Mostrar el formulario para registrar una nueva cartera
  mostrarFormularioRegistro(): void {
    this.mostrarFormulario = true;
  }

  // Registrar la nueva cartera
  registrarCartera(): void {
    const fechaFormateada = this.datePipe.transform(this.nuevaCartera.fecha_descuento, 'dd-MM-yyyy');
    this.nuevaCartera.fecha_descuento = fechaFormateada ? fechaFormateada : '';  // Aseguramos que sea un string

    this.carteraService.crearCartera(this.nuevaCartera).subscribe(
      response => {
        console.log('Cartera registrada con éxito', response);
        this.loadCarteras(); // Recargar las carteras
        this.mostrarFormulario = false; // Cerrar el formulario
      },
      error => {
        console.error('Error al registrar la cartera', error);
      }
    );
  }

  verFacturas(idCartera: number): void {
    this.router.navigate(['/cartera', idCartera]); // Redirigir al componente Factura con el ID de la cartera
  }

  eliminarCartera(idCartera: number): void {
    this.carteraService.eliminarCartera(idCartera).subscribe(
      response => {
        console.log('Cartera eliminada con éxito', response);
        this.loadCarteras(); // Recargar las carteras
      },
      error => {
        console.error('Error al eliminar la cartera', error);
      }
    );
  }

  editarCartera(cartera: CarteraDTO): void {
    this.carteraEditar = { ...cartera };  // Clonar la cartera para editar
  }

  // En CarterasComponent
actualizarCartera(): void {
  if (this.carteraEditar) {
    const fechaFormateada = this.datePipe.transform(this.carteraEditar.fecha_descuento, 'dd-MM-yyyy');
    this.carteraEditar.fecha_descuento = fechaFormateada ? fechaFormateada : ''; // Asegurarnos que la fecha esté en el formato adecuado

    // Actualizamos la cartera
    this.carteraService.modificarCartera(this.carteraEditar, this.carteraEditar.id_cartera!).subscribe(
      () => {
        console.log('Cartera modificada con éxito');
        this.loadCarteras();  // Recargar las carteras

        // Recargamos las facturas asociadas a la cartera
        this.facturaService.getFacturasByCartera(this.carteraEditar?.id_cartera!).subscribe(facturas => {
          facturas.forEach(factura => {
            // Para cada factura, recargamos los gastos asociados a esa factura
            this.gastoService.getGastosByFacturaId(factura.id_factura).subscribe(
              (gastos) => {
                // Aquí puedes actualizar los gastos o hacer algo con ellos, dependiendo de tu lógica
                console.log(`Gastos de la factura ${factura.id_factura}:`, gastos);
              },
              (error) => {
                console.error('Error al cargar los gastos para la factura', error);
              }
            );
          });
        });

        this.carteraEditar = null;  // Limpiar el formulario de edición
      },
      (error) => {
        console.error('Error al modificar la cartera', error);
      }
    );
  }
}


  cancelarEdicion(): void {
    this.carteraEditar = null;  // Cancelar la edición
  }

}
