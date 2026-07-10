import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../Interface/Admin';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private http = inject(HttpClient);
  private apiURL = "https://www.ignacioyañez.com/api/admin/login";

  // Cambiamos el logIn para que maneje el objeto del Token
  logIn(credentials: Admin): Observable<any> {
    return this.http.post<any>(this.apiURL, credentials).pipe(
      tap(res => {
        // Guardamos igual que en MyM
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.username);
          localStorage.setItem('id', res.id.toString());
        }
      })
    );
  }

  logOut() {
    localStorage.clear();
  }

  getIsLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}