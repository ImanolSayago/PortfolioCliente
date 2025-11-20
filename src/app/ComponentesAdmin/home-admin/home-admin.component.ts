import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavBarAdminComponent } from "../nav-bar-admin/nav-bar-admin.component";
import { Proyectos } from '../../Interface/Proyectos';
import { ProyectosService } from '../../Services/proyectos.service';
import { FooterComponent } from "../../ComponentesPrincipales/footer/footer.component";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [NavBarAdminComponent, FooterComponent,RouterLink],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit{

  ngOnInit(): void {
    this.traerProyectos();
  }

  rutas = inject(Router);
  listaProyectos:Proyectos[]=[];
  serviceProyectos = inject(ProyectosService);

  traerProyectos()
  {
    this.serviceProyectos.getProyectos().subscribe({
      next:(lista)=>
      {

        this.listaProyectos=lista;
      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })
  }

  irCrearProyecto()
  {
    this.rutas.navigate(["CrearProyecto"]);
  }

  deleteProyectoById(id:number)
  {
    this.serviceProyectos.deleteProyectoID(id).subscribe({
      next:()=>
      {
        alert("Proyecto eliminado con exito");
      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })
  }
}
