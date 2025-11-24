import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar-admin',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar-admin.component.html',
  styleUrl: './nav-bar-admin.component.css'
})
export class NavBarAdminComponent {
rutas = inject(Router);

menuOpen = false;
salir()
{
  localStorage.clear();
      this.rutas.navigate(["inicioSesion"]);
}

irCrearProyecto()
{
  this.rutas.navigate(["CrearProyecto"])
}
}
