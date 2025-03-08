import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Proyectos } from '../../Interface/Proyectos';
import { FooterComponent } from "../footer/footer.component";
import { AuthServiceService } from '../../Services/auth-service.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ProyectosService } from '../../Services/proyectos.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [NavBarComponent, FooterComponent,RouterLink],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent implements OnInit{
  router = inject(Router)
  ngOnInit(): void {
   this.traerProyectos();
    this.router.events.pipe(
         filter((event): event is NavigationEnd => event instanceof NavigationEnd)
       ).subscribe(() => {
         window.scrollTo(0, 0); // Restablecer el scroll al inicio
       });
  }

  listaproyectos:Proyectos[]=[];

  servicioProyectos = inject(ProyectosService);

  traerProyectos()
  {
    this.servicioProyectos.getProyectos().subscribe({
      next:(lista)=>
      {
        
        this.listaproyectos=lista;

      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })
  }
 
  
}
