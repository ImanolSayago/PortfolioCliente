import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  rutas = inject(Router)

  irLogin()
  {
    this.rutas.navigate(["inicioSesion"])
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
}
}
