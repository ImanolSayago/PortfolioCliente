import { inject } from "@angular/core"

import { Router } from "@angular/router";

export const authGuardFnLogout = ()=>
{


   const rutas = inject(Router);
   if(!localStorage.getItem("token"))
   {
        return true;
   }
   else
   {
    rutas.navigate(["HomeAdmin"])
    return false;
   }
}