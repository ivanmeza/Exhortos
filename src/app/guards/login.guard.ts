import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const LoginGuard: CanActivateFn = () => {
  const router = inject(Router); //se inyecta el router para poder redireccionar a la ruta que se desee en caso de que el usuario no este logueado
  const token = localStorage.getItem('token'); //se obtiene el token del localstorage para saber si el usuario esta logueado o no

  //si token es null significa que el usuario no esta logueado y se le permite el acceso a la ruta
  if (token == null) {
    return true;
  } else { //si el usuario esta logueado se redirecciona a la ruta panel
    router.navigate(['/panel']);
    return true;
  }
};
