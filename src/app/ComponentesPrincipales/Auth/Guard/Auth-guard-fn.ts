import { inject } from "@angular/core";
import { AuthServiceService } from "../../../Services/auth-service.service";
import { Router } from "@angular/router";

export const authGuardFn = ()=>
    {
       const  authservice = inject(AuthServiceService);
    
       const rutas = inject(Router);
       
       if(authservice.getIsLoggedIn() || localStorage.getItem("token"))
       {
        localStorage.setItem("token","123.123.123");
            return true;
       }
       else
       {
        localStorage.removeItem("token"); // Eliminar token inválido
        rutas.navigate(["inicioSesion"])
        return false;
       }
    }