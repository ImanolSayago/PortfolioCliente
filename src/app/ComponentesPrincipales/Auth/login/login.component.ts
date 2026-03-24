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
    this.admin.nombreUsuario = this.formulario.value.usuario;
    this.admin.contrasena = this.formulario.value.contrasena;

    this.authService.logIn(this.admin).subscribe({
      next: (res) => {
      
        console.log('Login exitoso, token guardado');
        this.router.navigate(['HomeAdmin']);
      },
      error: (err) => {
        console.error('Error en el login', err);
        alert('Usuario o contraseña incorrectos');
      }
    });
  } else {
    alert('Por favor, completa todos los campos.');
  }
}

}
