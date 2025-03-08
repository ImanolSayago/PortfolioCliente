import { Routes } from '@angular/router';
import { LoginComponent } from './ComponentesPrincipales/Auth/login/login.component';
import { HomeUserComponent } from './ComponentesPrincipales/home-user/home-user.component';
import { MuestraProyectoComponent } from './ComponentesPrincipales/muestra-proyecto/muestra-proyecto.component';

export const routes: Routes = [

    ///RUTAS USER///
    {path:"inicioSesion",component:LoginComponent},
    {
        path:"homeUser", component: HomeUserComponent
    }
    ,
    {
        path:"proyecto/:id", component: MuestraProyectoComponent
    },

    { path: '', redirectTo: 'homeUser', pathMatch: 'full' }



    ///RUTAS ADMIN///
  
];
