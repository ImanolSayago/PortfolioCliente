import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Proyectos } from '../../Interface/Proyectos';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ProyectosService } from '../../Services/proyectos.service';
import { filter } from 'rxjs';
import { CloudinaryOptimizePipe } from '../../pipes/cloudinary-optimize.pipe';
import { AboutMeComponent } from "../about/about-me/about-me.component";

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [NavBarComponent, RouterLink, CloudinaryOptimizePipe, AboutMeComponent],
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
         window.scrollTo(0, 0);
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
