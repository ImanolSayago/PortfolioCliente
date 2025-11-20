import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Admin } from '../../../Interface/Admin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavBarComponent,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  router = inject(Router)
  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0); // Restablecer el scroll al inicio
    });
  }

  authService= inject(AuthServiceService);
 
  fb = inject(FormBuilder);

  formulario = this.fb.nonNullable.group({
    usuario:["",Validators.required],
    contrasena:["",Validators.required]
  })


  admin: Admin={
    nombreUsuario:"",
    contrasena:""
  }

  onLoginLogout() {
    if (this.formulario.valid) {
      const credentials = this.formulario.value;  // Obtenemos los datos del formulario
      
      this.admin.nombreUsuario = this.formulario.value.usuario;
      this.admin.contrasena = this.formulario.value.contrasena;

      this.authService.logIn(this.admin).subscribe(
        (isAuthenticated) => {
          if (isAuthenticated) {
            // Si el login es exitoso, redirigimos al home
            this.router.navigate(['HomeAdmin']);
          } else {
            // Si el login falla, mostramos un mensaje
            alert('Error: Usuario o contraseña incorrectos');
          }
        },
        (error) => {
          // Aquí manejamos errores si la API falla
          console.error('Error en la solicitud de login', error);
          alert('Error en la solicitud de login');
        }
      );
    } else {
      // Si el formulario no es válido, mostramos un mensaje
      alert('Por favor, completa todos los campos.');
    }
  }

}
