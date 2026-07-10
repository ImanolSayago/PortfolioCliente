import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  rutas = inject(Router);
menuOpen = false;

  irLogin()
  {
    this.rutas.navigate(["inicioSesion"]);
  }

  goContact()
  {
    this.rutas.navigate(['contact']);
  }

 scrollTo(section: string) {
  this.menuOpen = false;

  // Si ya estamos en el home, hacemos scroll suave
  if (this.rutas.url === '/homeUser' || this.rutas.url === '/') {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    // Si estamos en otra página, navegamos al home pasando el fragmento
    this.rutas.navigate(['/homeUser'], { fragment: section });
  }
}

}
