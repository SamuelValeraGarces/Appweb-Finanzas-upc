import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  isAuthenticated: boolean = false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();  // Verificar si el usuario está autenticado
    
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);  // Si no está autenticado, redirigir al login
    }
  }
  irAComponent(componente: string): void {
    switch (componente) {
      case 'tasas':
        this.router.navigate(['/tasa']);
        break;
      case 'monedas':
        this.router.navigate(['/moneda']);
        break;
      case 'carteras':
        this.router.navigate(['/cartera']);
        break;
      default:
        break;
    }
  }
  cerrarSesion(): void {
    this.authService.logout(); // Llama al servicio para cerrar sesión
  }
 
}
