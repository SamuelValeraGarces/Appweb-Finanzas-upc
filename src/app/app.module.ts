import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarterasComponent } from './components/carteras/carteras.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MonedasComponent } from './components/monedas/monedas.component';
import { TasasComponent } from './components/tasas/tasas.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CarterasComponent,
    FacturasComponent,
    LoginComponent,
    RegisterComponent,
    MonedasComponent,
    TasasComponent,
    GastosComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }  // Registramos el interceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
