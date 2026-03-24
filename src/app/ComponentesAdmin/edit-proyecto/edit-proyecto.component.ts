import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProyectosService } from '../../Services/proyectos.service';
import { NavBarAdminComponent } from '../nav-bar-admin/nav-bar-admin.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudinaryOptimizePipe } from '../../pipes/cloudinary-optimize.pipe';
import { ModalComponent } from '../../Shared/Components/modal/modal.component';

@Component({
  selector: 'app-edit-proyecto',
  standalone: true,
  imports: [CloudinaryOptimizePipe, ReactiveFormsModule, NavBarAdminComponent, NgxDropzoneModule, CommonModule, ModalComponent],
  templateUrl: './edit-proyecto.component.html',
  styleUrl: './edit-proyecto.component.css'
})
export class EditProyectoComponent implements OnInit {
@ViewChild('modalSucces') modalSuccess!:ModalComponent;
  @ViewChild('modalError') modalError!:ModalComponent;

  files: any[] = [];
  proyectoID: number = 0;
  route = inject(ActivatedRoute);
  router = inject(Router);
  servicioProyectos = inject(ProyectosService);
  fb = inject(FormBuilder);
  cd = inject(ChangeDetectorRef);
  cargando:boolean = false;

  formulario = this.fb.nonNullable.group({
    titulo: ['', Validators.required],
  });

  esString(val: any): boolean {
    return typeof val === 'string';
  }

  onSelect(event: any): void {
    this.files.push(...event.addedFiles);
  }

  onRemove(file: any): void {
    this.files = this.files.filter((f) => f !== file);
  }

  subirProyecto(): void {
    if (this.formulario.invalid) {
      alert('El formulario no está completo');
      return;
    }
   this.cargando = true;
  const formData = new FormData();
  formData.append("titulo", this.formulario.value.titulo ?? "");

  const item0 = this.files[0];
  const item1 = this.files[1];

  if (typeof item0 === 'string') {
    formData.append("urlPortadaWeb", item0);
  } else {
    formData.append("archivoPortadaWeb", item0);
  }
  if (typeof item1 === 'string') {
    formData.append("urlPortadaMobile", item1);
  } else if (item1) {
    formData.append("archivoPortadaMobile", item1);
  }

  this.files.slice(2).forEach(f => {
    if (typeof f === 'string') {
      formData.append("imagenesExistentesUrls", f);
    } else {
      formData.append("archivosNuevosGaleria", f);
    }
  });
    this.servicioProyectos.editProyecto(this.proyectoID, formData).subscribe({
      next: () => {
        this.cargando = false;
       this.modalSuccess.open('Proyecto editado con exito')
       this.cd.detectChanges();
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        console.error(error);
         this.cargando = false;
       this.modalError.open('El proyecto no se pudo editar, intente nuevamente');
       this.cd.detectChanges();
      },
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.proyectoID = Number(params.get('id'));
      this.cargarProyecto();
    });
  }

 cargarProyecto(): void {
  this.servicioProyectos.getProyectoByID(this.proyectoID).subscribe((proyecto) => {
    this.formulario.patchValue({
      titulo: proyecto.titulo,
    });
    this.files = [];

    if (proyecto.imagenPrincipal) {
      this.files.push(proyecto.imagenPrincipal);
    } else {
      this.files.push(''); 
    }

    if (proyecto.imagenPrincipalMobile) {
      this.files.push(proyecto.imagenPrincipalMobile);
    } else {
      this.files.push(''); 
    }

    if (proyecto.listaImg) {
      proyecto.listaImg.forEach((img: any) => this.files.push(img.url));
    }
    this.cd.detectChanges();
  });
}
}