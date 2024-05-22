import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { Router, RouterLink,RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TitleComponent } from 'src/app/Components/title/title.component';
@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    CommonModule,NzLayoutModule, NzMenuModule, RouterLink, NzIconModule,RouterOutlet,TitleComponent],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit{
  isCollapsed = false;

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  // ------------------------------------------
  private router = inject(Router);
  // -------------------------------------------
  ruta: string = '';
  // constructor() {  }
  ngOnInit(): void {
    this.ruta = this.router.url;
  }
  updateRoute(route: string) {
    this.ruta = route;
  }
}
