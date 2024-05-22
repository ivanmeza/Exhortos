import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'src/app/shared/ng-zorro';
@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule,NgZorroAntdModule],
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  @Input() route: string | undefined;
  title: string = '';
  getTitle() {
    switch (this.route) {
      case '/panel/exhorto':
        this.title = 'REGISTRO DE EXHORTOS';
        break;
      case '/panel/prueba':
        this.title = 'PRUEBA';
        break;
      case '/panel/exhortos-nacionales':
        this.title = 'EXHORTOS NACIONALES';
        break;
      // Agrega más casos según sea necesario
      default:
        this.title = 'Título por defecto';
    }
  }
  ngOnChanges() {
    this.getTitle();
  }
}
