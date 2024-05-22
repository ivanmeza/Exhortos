import { inject } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

export function PanelGuard(state: RouterStateSnapshot) {
  const router = inject(Router); //se inyecta el router para poder redireccionar a la ruta que se desee en caso de que el usuario no este logueado
  const token = localStorage.getItem('token'); //se obtiene el token del localstorage para saber si el usuario esta logueado o no
  if (token !== null) {// si el token no es nulo significa que el usuario esta logueado y se le permite el acceso a la ruta
    return true; //si el usuario esta logueado se le permite el acceso a la ruta
  } else { //si el usuario no esta logueado se le redirecciona a la ruta de login
    router.navigate(['/login']); //se redirecciona a la ruta de login
    return false;
  }
}
