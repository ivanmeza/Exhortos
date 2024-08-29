import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { MenuService } from 'src/app/Services/Menu/menu.service';
import { NzMessageService } from 'ng-zorro-antd/message';
export const MenuGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const  message: NzMessageService = inject(NzMessageService);
  const router = inject(Router); //se inyecta el router para poder redireccionar a la ruta que se desee en caso de que el usuario no este logueado
  const menuService: MenuService = inject(MenuService);
  const menuItems = menuService.getMenuItems();
  // const menuItems = [
  //   { id: '1', name: 'Alta Exhorto', icon: 'file-done', route: '/panel/exhorto'},
  //   { id: '2', name: 'Exhortos Temporales', icon: 'insert-row-above', route: '/panel/exhortos-nacionales' },
  //   { id: '3', name: 'Exhortos Recibidos', icon: 'insert-row-above', route: '/panel/exhortos-recibidos' },
  //   { id: '4', name: 'Respuesta Pendientes', icon: 'bell', route: '/panel/respuestas-pendientes' },
  // ];
  const menuOptions: string[] = JSON.parse(localStorage.getItem('menuOptions') || '[]');
  console.log('menuOptions guard', menuOptions);

  //comparo los elementos del menu con los elementos del menuOptions localstorage
  //y los elementos de menu que no esten en menuOptions los guardo en nonMatchingOptions
  //con esto obtengo los elementos que no estan en el menuOptions localstorage y a los cuale sno podra acceder este usuario logeado
  const nonMatchingOptions = menuItems.filter(item => !menuOptions.includes(item.id));
  console.log('nonMatchingOptions guard', nonMatchingOptions);

  const hasRestrictedAccess = nonMatchingOptions.some(option => state.url.startsWith(option.route));
  if (hasRestrictedAccess) {

    message.create('error', 'No tienes permisos para acceder a esta sección');

    // Redirigir al usuario a una ruta específica o denegar el acceso
    // alert('No tienes permisos para acceder a esta sección');
    router.navigate(['/panel/Inicio']);
    return false; // Denegar el acceso a la ruta actual
  }

  return true;

}
