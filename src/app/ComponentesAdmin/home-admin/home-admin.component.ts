import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavBarAdminComponent } from "../nav-bar-admin/nav-bar-admin.component";
import { Proyectos } from '../../Interface/Proyectos';
import { ProyectosService } from '../../Services/proyectos.service';
import { FooterComponent } from "../../ComponentesPrincipales/footer/footer.component";
import { FormBuilder, Validators } from '@angular/forms';
import { CloudinaryOptimizePipe } from '../../pipes/cloudinary-optimize.pipe';
import { ModalComponent } from "../../Shared/Components/modal/modal.component";

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [NavBarAdminComponent, RouterLink, CloudinaryOptimizePipe, ModalComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})export class HomeAdminComponent implements OnInit {
    @ViewChild('modalSucces') modalSuccess!:ModalComponent;
    @ViewChild('modalError') modalError!:ModalComponent;

  ngOnInit(): void {
    this.traerProyectos();
  }

  rutas = inject(Router);
  listaProyectos: Proyectos[] = [];
  listaFiltrada: Proyectos[] = [];
  cd = inject(ChangeDetectorRef);

  serviceProyectos = inject(ProyectosService);

  traerProyectos() {
    this.serviceProyectos.getProyectos().subscribe({
      next: (lista) => {
        this.listaProyectos = lista;
        this.listaFiltrada = lista; 
        this.cd.detectChanges()
      },
      error: (err: Error) => {
        console.log(err.message);
        this.cd.detectChanges()
      }
    });
  }

  filtrarProyectos(texto: string) {
    const t = texto.toLowerCase().trim();

    this.listaFiltrada = this.listaProyectos.filter(p =>
      p.titulo?.toLowerCase().includes(t)
    );
    this.cd.detectChanges()
  }

  irCrearProyecto() {
    this.rutas.navigate(["CrearProyecto"]);
    this.cd.detectChanges()
  }

  deleteProyectoById(id: number) {
    this.serviceProyectos.deleteProyectoID(id).subscribe({
      next: () => {
        this.modalSuccess.open('Proyecto eliminado con exito')
        this.traerProyectos();
        this.cd.detectChanges();
      },
      error: (err: Error) => {
        console.log(err);
          this.modalError.open('Error al eliminar el proyecto, intente nuevamente');
          this.cd.detectChanges();
      }
    });
  }
}