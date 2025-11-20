import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProyectoEditDTO, ProyectosService } from '../../Services/proyectos.service';
import { NavBarAdminComponent } from '../nav-bar-admin/nav-bar-admin.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-edit-proyecto',
  standalone: true,
  imports: [ReactiveFormsModule, NavBarAdminComponent,NgxDropzoneModule, CommonModule],
  templateUrl: './edit-proyecto.component.html',
  styleUrl: './edit-proyecto.component.css'
})
export class EditProyectoComponent implements OnInit{
  files: any[] = [];
  proyectoID: number = 0;
  route = inject(ActivatedRoute);
  router = inject(Router);
  servicioProyectos = inject(ProyectosService);
  fb = inject(FormBuilder);

  formulario = this.fb.nonNullable.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

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

    const proyecto: ProyectoEditDTO = {
      titulo: this.formulario.value.titulo ?? '',
      descripcion: this.formulario.value.descripcion ?? '',
      imagenesExistentesUrls: this.files.filter(file => typeof file === 'string').map(file => file as string),
    };

    const formData = new FormData();
    formData.append('titulo', proyecto.titulo);
    formData.append('descripcion', proyecto.descripcion);
    proyecto.imagenesExistentesUrls.forEach(url => formData.append('imagenesExistentesUrls', url));

    this.files.filter(file => typeof file !== 'string').forEach(file => formData.append('archivos', file));

    console.log('FormData.getAll("imagenesExistentesUrls"):', formData.getAll('imagenesExistentesUrls'));
    console.log('FormData:', formData);

    this.servicioProyectos.editProyecto(this.proyectoID, formData).subscribe({
      next: (response) => {
        console.log(response);
        alert('Proyecto editado con éxito');
      },
      error: (error) => {
        console.error(error);
        alert('Error al editar el proyecto');
      },
    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });

    this.route.paramMap.subscribe((params) => {
      this.proyectoID = Number(params.get('id'));
      this.cargarProyecto();
    });
  }

  cargarProyecto(): void {
    this.servicioProyectos.getProyectoByID(this.proyectoID).subscribe(async (proyecto) => {
      this.formulario.patchValue({
        titulo: proyecto.titulo,
        descripcion: proyecto.descripcion,
      });
      if (proyecto.listaImg) {
        await this.cargarImagenes(proyecto.listaImg);
      }
      // No llamamos a subirProyecto() aquí
    }, (error) => {
      console.log(error.message);
    });
  }

  async cargarImagenes(imagenes: any[]): Promise<void> {
    const promises = imagenes.map(async (imagen) => {
      try {
        const response = await fetch(imagen.url);
        const blob = await response.blob();
        const file = new File([blob], imagen.url.substring(imagen.url.lastIndexOf('/') + 1), {
          type: blob.type,
        });
        this.files.push(file);
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
      }
    });
    await Promise.all(promises);
  }
}
