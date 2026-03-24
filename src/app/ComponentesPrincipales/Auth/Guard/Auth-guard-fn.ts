import { inject } from "@angular/core";
import { AuthServiceService } from "../../../Services/auth-service.service";
import { Router } from "@angular/router";

export const authGuardFn = () => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {

    router.navigate(["inicioSesion"]);
    return false;
  }
};