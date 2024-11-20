import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router, RouterOutlet } from '@angular/router';

import { CarterasService} from './services/carteras/carteras.service';
import { FacturasService} from './services/facturas/facturas.service';
import { GastosService} from './services/gastos/gastos.service';
import { MonedasService} from './services/monedas/monedas.service';
import {TasasService} from './services/tasas/tasas.service';
import {UsuariosService} from './services/usuarios/usuarios.service';
import {AuthService} from './services/auth/auth.service';
import { privateDecrypt } from 'crypto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

title="FinanzasFront";
 
}
