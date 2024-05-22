import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'src/app/shared/ng-zorro';

@Component({
  selector: 'app-exhortos-nacionales',
  standalone: true,
  imports: [CommonModule,NgZorroAntdModule],
  templateUrl: './exhortos-nacionales.component.html',
  styleUrls: ['./exhortos-nacionales.component.scss']
})
export class ExhortosNacionalesComponent {

}
