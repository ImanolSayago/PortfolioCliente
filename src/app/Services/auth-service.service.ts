import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyectos } from '../Interface/Proyectos';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  http = inject(HttpClient)



 
}
