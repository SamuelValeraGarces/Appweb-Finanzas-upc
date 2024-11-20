import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router  } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isLoggedIn()) {
      return true; // El usuario está autenticado, deja pasar
    }

    // Si no está autenticado, redirige al login
    this.router.navigate(['/login']);
    return false;
  }
}
