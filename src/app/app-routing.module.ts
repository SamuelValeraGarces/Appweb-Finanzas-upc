import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent} from './components/login/login.component';
import { SecurityGuard } from './guards/security.guard';
import { RegisterComponent } from './components/register/register.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { CarterasComponent } from './components/carteras/carteras.component';
import { TasasComponent } from './components/tasas/tasas.component';
import { MonedasComponent } from './components/monedas/monedas.component';
import { GastosComponent } from './components/gastos/gastos.component';
const routes: Routes = [ 
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a login si la ruta está vacía
  { path: 'login', component: LoginComponent }, // Ruta para el login
  { path: 'menu', component: MenuComponent, canActivate: [SecurityGuard] }, // Ruta para Navbar protegida
  { path: 'register', component: RegisterComponent },
  {path: 'cartera/:idCartera', component : FacturasComponent },
  { path: 'cartera', component: CarterasComponent},
  { path: 'moneda', component: MonedasComponent},
  { path: 'tasa', component: TasasComponent},
  {path: 'gasto/:idFactura', component: GastosComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
