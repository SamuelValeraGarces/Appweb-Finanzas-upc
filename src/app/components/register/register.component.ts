import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre_usuario: ['', Validators.required],
      clave: ['', Validators.required],
      // Puedes agregar más campos según sea necesario, como email, etc.
    });
  }
  retroceder() {
    this.location.back();
  }


  register(): void {
    // Verifica si el formulario es inválido
    if (this.registerForm.invalid) {
      // Si el formulario es inválido, muestra un mensaje de error
      alert('Por favor complete todos los campos.');
      return; // Detiene la ejecución si el formulario es inválido
    }
  
    // Si el formulario es válido, proceder con el registro
    this.authService.registerUser(this.registerForm.value).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/login']); // Redirigir al login después de registrarse
      },
      (error) => {
        console.error('Error al registrar:', error);
        // Manejar el error, mostrar un mensaje al usuario
      }
    );
  }

}
