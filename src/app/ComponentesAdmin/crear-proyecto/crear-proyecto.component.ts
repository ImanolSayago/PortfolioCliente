import { Component, inject } from '@angular/core';
import { NavBarAdminComponent } from "../nav-bar-admin/nav-bar-admin.component";
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProyectosService } from '../../Services/proyectos.service';

@Component({
  selector: 'app-crear-proyecto',
  standalone: true,
  imports: [NavBarAdminComponent, NgxDropzoneModule, CommonModule,ReactiveFormsModule],
  templateUrl: './crear-proyecto.component.html',
  styleUrl: './crear-proyecto.component.css'
})
export class CrearProyectoComponent {

  files: File[] = [];

  servicioProyectos = inject(ProyectosService);
  fb = inject(FormBuilder);

  formulario = this.fb.nonNullable.group({
    titulo:["",Validators.required],
    descripcion:["",Validators.required],
  })

 

onSelect(event:any) {

  this.files.push(...event.addedFiles);
}

onRemove(event:any) {
  
  this.files.splice(this.files.indexOf(event), 1);
}

subirProyecto() {
  if (this.formulario.invalid || this.files.length === 0) {
    alert("El formulario no está completo");
    return;
  }

  const formData = new FormData();
  formData.append("titulo", this.formulario.value.titulo ?? "");
  formData.append("descripcion", this.formulario.value.descripcion ?? "");

  this.files.forEach((file) => {
    formData.append("archivos", file);
  });

  console.log(formData.getAll('archivos')); // Verifica los archivos en formData

  this.servicioProyectos.crearProyecto(formData).subscribe({
    next: (response: any) => {
      console.log(response);  // Aquí recibirás el objeto JSON con {message, success}
      if (response.success) {
        alert("Proyecto creado");
        this.files=[];
      } else {
        alert("Error: " + response.message);
      }
    },
    error: (err: any) => {
      console.log(err);
      alert("Error al crear el proyecto");
    }
  });
}

}
