import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProyectoEditDTO, ProyectosService } from '../../Services/proyectos.service';
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

  files: any[] = []; // Aquí habrá mezclas de String y File
  proyectoID: number = 0;
  route = inject(ActivatedRoute);
  router = inject(Router);
  servicioProyectos = inject(ProyectosService);
  fb = inject(FormBuilder);
  cd = inject(ChangeDetectorRef);
  cargando:boolean = false;

  formulario = this.fb.nonNullable.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  // Función auxiliar para usar en el HTML
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
    formData.append('titulo', this.formulario.value.titulo ?? '');
    formData.append('descripcion', this.formulario.value.descripcion ?? '');

    // 1. Filtramos las imágenes que se quedaron como URL (Strings)
    const imagenesExistentesUrls = this.files.filter(f => typeof f === 'string');
    
    // Si no hay existentes, enviamos una cadena vacía para que Spring no falle
    if (imagenesExistentesUrls.length > 0) {
      imagenesExistentesUrls.forEach(url => formData.append('imagenesExistentesUrls', url));
    } else {
      formData.append('imagenesExistentesUrls', '');
    }

    // 2. Filtramos los ARCHIVOS nuevos seleccionados en el dropzone
    const nuevosArchivos = this.files.filter(f => typeof f !== 'string');
    nuevosArchivos.forEach(file => formData.append('archivos', file));

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
        descripcion: proyecto.descripcion,
      });

      // Vaciamos por seguridad antes de cargar
      this.files = [];

      // Metemos las URLs directamente como STRINGS (Sin fetch)
      if (proyecto.imagenPrincipal) {
        this.files.push(proyecto.imagenPrincipal);
      }
      if (proyecto.listaImg) {
        proyecto.listaImg.forEach((img: any) => this.files.push(img.url));
      }
    });
  }
}