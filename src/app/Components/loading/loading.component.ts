import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'src/app/shared/ng-zorro';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule,NgZorroAntdModule,ProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

}
