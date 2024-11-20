import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service'; // Ajusta la ruta según tu estructura
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuarioForm!: FormGroup;
  errorMessage: string = ''; // Variable para almacenar el mensaje de error

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  login(): void {
    if (this.usuarioForm.invalid) {
      alert('Por favor complete todos los campos.');
      return; // Detiene la ejecución si el formulario es inválido
    }

    this.authService.login(this.usuarioForm.value).subscribe(
      (authResponse) => {
        // Guardar el token en localStorage
        localStorage.setItem('token', authResponse.token);
        // Redirigir al navbar
        this.router.navigate(['/menu']);
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        // Si el error es de usuario no encontrado
        if (error.status === 404) {
          alert('Usuario no existe. Por favor verifique sus credenciales.');
        } else {
          alert('Hubo un problema al intentar iniciar sesión. Intente nuevamente.');
        }
      }
    );
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']); // Redirigir al componente de registro
  }
}
