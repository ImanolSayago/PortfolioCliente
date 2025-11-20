import { Routes } from '@angular/router';
import { LoginComponent } from './ComponentesPrincipales/Auth/login/login.component';
import { HomeUserComponent } from './ComponentesPrincipales/home-user/home-user.component';
import { MuestraProyectoComponent } from './ComponentesPrincipales/muestra-proyecto/muestra-proyecto.component';
import { authGuardFnLogout } from './ComponentesPrincipales/Auth/Guard/Auth-guard-fn-copy';
import { authGuardFn } from './ComponentesPrincipales/Auth/Guard/Auth-guard-fn';
import { HomeAdminComponent } from './ComponentesAdmin/home-admin/home-admin.component';
import { CrearProyectoComponent } from './ComponentesAdmin/crear-proyecto/crear-proyecto.component';
import { EditProyectoComponent } from './ComponentesAdmin/edit-proyecto/edit-proyecto.component';

export const routes: Routes = [

    ///RUTAS USER///
    {path:"inicioSesion",component:LoginComponent,
        canActivate:[authGuardFnLogout]
    },
    {
        path:"homeUser", component: HomeUserComponent,
        canActivate:[authGuardFnLogout]
        
    }
    ,
    {
        path:"proyecto/:id", component: MuestraProyectoComponent,
        
    },

    { path: '', redirectTo: 'homeUser', pathMatch: 'full' },



    ///RUTAS ADMIN///

    {
            path:"HomeAdmin",component:HomeAdminComponent,
            canActivate:[authGuardFn]
    },
    {
        path:"CrearProyecto", component:CrearProyectoComponent,
        canActivate:[authGuardFn]
    },
    {
        path:"proyectoedit/:id", component: EditProyectoComponent,
        canActivate:[authGuardFn]
    }
  
];
