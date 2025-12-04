import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
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

  goAbout()
  {
    this.rutas.navigate(['sobre-mi']);
  }

  goContact()
  {
    this.rutas.navigate(['contact']);
  }

  scrollTo(section: string) {
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (!element) {
    this.rutas.navigate(['/homeUser']).then(() => {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      },300);
    });
  }

  this.menuOpen = false; 
}

}
