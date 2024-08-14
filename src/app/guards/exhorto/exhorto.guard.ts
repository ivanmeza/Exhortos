import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';


export const ExhortoGuard: CanActivateFn = () => {
  const router = inject(Router); //se inyecta el router para poder redireccionar a la ruta que se desee en caso de que el usuario no este logueado
  // Obtener el arreglo de parámetros desde el almacenamiento local
  const menuOptions: number[] = JSON.parse(localStorage.getItem('menuOptions') || '[]');
  // const prueba  = true;
  //si token es null significa que el usuario no esta logueado y se le permite el acceso a la ruta
  const restrictedOptions = [3,4]
  const hasRestrictedAccess = menuOptions.some(option => restrictedOptions.includes(option));

  if (!hasRestrictedAccess) {
    return true;
  } else { //bloqueo la entrada a la ruta y redirecciono al usuario a la ruta de login
    alert('No tienes permisos para acceder a esta sección');
    router.navigate(['/panel/Inicio']);
    return false;
  }
}
