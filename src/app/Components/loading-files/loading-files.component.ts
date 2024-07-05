import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'src/app/shared/ng-zorro';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading-files',
  standalone: true,
  imports: [CommonModule,NgZorroAntdModule,ProgressSpinnerModule],
  templateUrl: './loading-files.component.html',
  styleUrls: ['./loading-files.component.scss']
})
export class LoadingFilesComponent {

}
