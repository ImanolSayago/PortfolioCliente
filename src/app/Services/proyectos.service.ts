import { inject, Injectable } from '@angular/core';
import { Proyectos } from '../Interface/Proyectos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface ProyectoEditDTO {
  titulo: string;
  descripcion: string;
  imagenesExistentesUrls: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor() { }
   http = inject(HttpClient)
  
    private apiUrl = 'http://localhost:8080/api/proyecto';
  
    getProyectos():Observable<Proyectos[]>{
      const url = `${this.apiUrl}/traer`;
      return this.http.get<Proyectos[]>(url);
    }

    getProyectoByID(id:number):Observable<Proyectos>
    {
      const url= `${this.apiUrl}/traer/${id}`;
      return this.http.get<Proyectos>(url);
    }

    crearProyecto(form:FormData):Observable<any>
    {
      const url= `${this.apiUrl}/crear`;
      return this.http.post<any>(url,form);
    }

    deleteProyectoID(id:number):Observable<Proyectos>
    {
      const url = `${this.apiUrl}/borrar/${id}`;
      return this.http.delete<Proyectos>(url);
    }

    editProyecto(id: number, formData: FormData): Observable<any> {
      const url = `${this.apiUrl}/edit/${id}`;
      return this.http.put(url, formData);
    }
}
