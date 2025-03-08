import { Component, inject, OnInit } from '@angular/core';
import { Proyectos } from '../../Interface/Proyectos';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProyectosService } from '../../Services/proyectos.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { filter } from 'rxjs';

@Component({
  selector: 'app-muestra-proyecto',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './muestra-proyecto.component.html',
  styleUrl: './muestra-proyecto.component.css'
})
export class MuestraProyectoComponent implements OnInit{


  proyecto:Proyectos ={
    id: 0,
    titulo:"",
    descripcion:"",
    imagenPrincipal:"",
    listaImg: []
  }

  proyectoID:number=0;
  route = inject(ActivatedRoute);
  serviceProyecto= inject(ProyectosService);

  router = inject(Router)
  ngOnInit(): void {
     this.router.events.pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd)
        ).subscribe(() => {
          window.scrollTo(0, 0); // Restablecer el scroll al inicio
        });

    this.route.paramMap.subscribe(params => {
      this.proyectoID = Number(params.get('id'));

      this.serviceProyecto.getProyectoByID(this.proyectoID).subscribe({
        next:(pro)=>
        {
          this.proyecto = pro;
          console.log(this.proyecto.listaImg);

        },
        error:(err:Error)=>
        {
          console.log(err.message);
        }
      })
  }
  )}
 

  }
