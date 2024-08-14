import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'src/app/shared/ng-zorro';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule,NgZorroAntdModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

}
