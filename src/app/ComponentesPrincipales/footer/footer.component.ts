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
}
