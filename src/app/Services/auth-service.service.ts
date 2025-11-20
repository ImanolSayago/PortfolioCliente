import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Proyectos } from '../Interface/Proyectos';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../Interface/Admin';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }


  apiURL = "http://localhost:8080/api/admin/login"

  isLogin:boolean = false;

  http = inject(HttpClient);

  logIn(credentials: Admin): Observable<boolean> {  // Regresar un booleano para indicar si el login es exitoso
    return this.http.post<boolean>(this.apiURL, credentials).pipe(
      tap(isAuthenticated => {
        this.isLogin = isAuthenticated;  
      })
    );
  }

  logOut() {
    this.isLogin = false;
    
  }

  getIsLoggedIn(): boolean {
    return this.isLogin;
  }

 
}
