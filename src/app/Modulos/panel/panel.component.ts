import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ActivatedRoute, Router, RouterLink,RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TitleComponent } from 'src/app/Components/title/title.component';
import { MenuService } from 'src/app/Services/Menu/menu.service';
@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    CommonModule,NzLayoutModule, NzMenuModule, RouterLink, NzIconModule,RouterOutlet,TitleComponent],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit{
  private MenuService = inject(MenuService);
  private cd = inject(ChangeDetectorRef);
  private router = inject(Router);

  isCollapsed = true  ;

  opciones : string[] = [];
  // menuItems = [
  //   { id: '1', name: 'Alta Exhorto', icon: 'file-done', route: '/panel/exhorto',},
  //   { id: '2', name: 'Exhortos Temporales', icon: 'insert-row-above', route: '/panel/exhortos-nacionales' },
  //   { id: '3', name: 'Exhortos Recibidos', icon: 'insert-row-above', route: '/panel/exhortos-recibidos' },
  //   { id: '4', name: 'Respuesta Pendientes', icon: 'bell', route: '/panel/respuestas-pendientes' },
  // ];
  filteredMenuItems: any[] = [];
  ruta: string = '';

  toggleCollapse() {
    this.isCollapsed = true;
    this.cd.detectChanges();
  }
  // constructor() {  }
  ngOnInit(): void {
    // this.opciones = JSON.parse(localStorage.getItem('menuOptions') || '[]');
    // this.opciones.forEach((element) => {
    //   this.filteredMenuItems.push(this.menuItems.find((item) => item.id === element.toString()));
    // });
    this.opciones = JSON.parse(localStorage.getItem('menuOptions') || '[]');
    this.opciones.forEach((element) => {
      this.filteredMenuItems.push(this.MenuService.getMenuItems().find((item) => item.id === element.toString()));
    });
    this.ruta = this.router.url;
    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges(); // Asegúrate de que los cambios se detecten después de la vista inicial
  }
  updateRoute(route: string) {
    this.ruta = route;
  }

  async home() {
    this.router.navigate(['/panel/Inicio']);
  }
}
