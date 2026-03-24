import { inject } from "@angular/core"

import { Router } from "@angular/router";

export const authGuardFnLogout = () => {
  const router = inject(Router);
  const token = localStorage.getItem("token");

  if (!token) {
    // Si NO hay token, puede entrar al login/inicioSesion
    return true;
  } else {
    // Si YA hay un token, lo mandamos directo al panel
    router.navigate(["HomeAdmin"]);
    return false;
  }
};