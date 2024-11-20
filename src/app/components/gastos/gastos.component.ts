import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GastoDTO } from 'src/app/models/gasto-dto.model';
import { GastosService } from 'src/app/services/gastos/gastos.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {
  idFactura!: number;
  gastos: GastoDTO[] = [];
  nuevoGasto: GastoDTO = { id_gasto: 0, monto_gasto: 0, tipo_gasto: false, id_factura: 0 };
  gastoEditar: GastoDTO | null = null;
  constructor(private route: ActivatedRoute, private gastosService: GastosService, private location: Location) { }

  ngOnInit(): void {
     // Obtener el idFactura desde los parámetros de la ruta
     this.idFactura = Number(this.route.snapshot.paramMap.get('idFactura'));
     this.cargarGastos();
  }
  retroceder() {
    this.location.back();
  }

  cargarGastos(): void {
    this.gastosService.getGastosByFacturaId(this.idFactura).subscribe(
      (response) => {
        this.gastos = response;
      },
      (error) => {
        console.error('Error al cargar los gastos', error);
      }
    );
  }
  
  registrarGasto(): void {
    if (this.nuevoGasto.monto_gasto <= 0 || this.nuevoGasto.tipo_gasto == null) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    this.nuevoGasto.id_factura = this.idFactura; // Asocia el gasto a la factura actual
    this.gastosService.crearGasto(this.idFactura, this.nuevoGasto).subscribe(
      () => {
        this.cargarGastos(); // Recarga los gastos para mostrar el nuevo registro
        this.nuevoGasto = { id_gasto: 0, monto_gasto: 0, tipo_gasto: false, id_factura: this.idFactura }; // Reinicia el formulario
      },
      (error) => {
        console.error('Error al registrar el gasto', error);
      }
    );
  }


  eliminarGasto(idGasto: number): void {
    this.gastosService.eliminarGasto(idGasto).subscribe(
      () => this.cargarGastos(),
      (error) => {
        console.error('Error al eliminar el gasto', error);
      }
    );
  }

  iniciarEdicion(gasto: GastoDTO): void {
    this.gastoEditar = { ...gasto }; // Clonar para editar
  }

  actualizarGasto(): void {
    if (this.gastoEditar) {
      this.gastosService.modificarGasto(this.gastoEditar.id_gasto, this.gastoEditar).subscribe(
        () => {
          this.cargarGastos();
          this.gastoEditar = null;
        },
        (error) => {
          console.error('Error al modificar el gasto', error);
        }
      );
    }
  }

  cancelarEdicion(): void {
    this.gastoEditar = null;
  }

}
