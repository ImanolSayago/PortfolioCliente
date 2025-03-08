import { inject, Injectable } from '@angular/core';
import { Proyectos } from '../Interface/Proyectos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
}
