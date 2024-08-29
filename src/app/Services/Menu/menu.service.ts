import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  // constructor() { }

  menuItems = [
    { id: '1', name: 'Alta Exhorto', icon: 'file-done', route: '/panel/exhorto',
      // subMenu: [
      //   { id: 5, name: 'Sub Opción 1', icon: 'file-done', route: '/panel/exhorto/otro' },
      // ]
     },
    { id: '2', name: 'Exhortos Temporales', icon: 'insert-row-above', route: '/panel/exhortos-nacionales' },
    { id: '3', name: 'Exhortos Recibidos', icon: 'insert-row-above', route: '/panel/exhortos-recibidos' },
    { id: '4', name: 'Respuesta Pendientes', icon: 'bell', route: '/panel/respuestas-pendientes' },
    // Agrega más opciones según sea necesario
  ];

  getMenuItems() {
    return this.menuItems;
  }
}
