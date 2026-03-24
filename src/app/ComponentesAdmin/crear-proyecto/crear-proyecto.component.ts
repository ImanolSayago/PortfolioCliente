import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { NavBarAdminComponent } from "../nav-bar-admin/nav-bar-admin.component";
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProyectosService } from '../../Services/proyectos.service';
import { ModalComponent } from '../../Shared/Components/modal/modal.component';

@Component({
  selector: 'app-crear-proyecto',
  standalone: true,
  imports: [NavBarAdminComponent, NgxDropzoneModule, CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './crear-proyecto.component.html',
  styleUrl: './crear-proyecto.component.css'
})
export class CrearProyectoComponent {
  @ViewChild('modalSucces') modalSuccess!:ModalComponent;
  @ViewChild('modalError') modalError!:ModalComponent;

  files: File[] = [];
  cargando: boolean = false;
  servicioProyectos = inject(ProyectosService);
  fb = inject(FormBuilder);
  cd = inject(ChangeDetectorRef);
  formulario = this.fb.nonNullable.group({
    titulo:["",Validators.required],
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
this.cargando = true;
  const formData = new FormData();
  formData.append("titulo", this.formulario.value.titulo ?? "");
  this.files.forEach((file) => {
    formData.append("archivos", file);
  });

  console.log(formData.getAll('archivos')); // Verifica los archivos en formData

  this.servicioProyectos.crearProyecto(formData).subscribe({
    next: (response: any) => {
      this.cargando = false;
      console.log(response);  // Aquí recibirás el objeto JSON con {message, success}
      if (response.success) {
        this.modalSuccess.open('Proyecto creado con exito')
        this.files=[];
        this.formulario.reset();
        this.cd.detectChanges();
      } else {
        alert("Error: " + response.message);
      }
    },
    error: (err: any) => {
      this.cargando = false;
      console.log(err);
      this.modalError.open('El proyecto no se pudo crear, intente nuevamente');
      this.cd.detectChanges();
    }
  });
}

}
