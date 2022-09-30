import { Component } from '@angular/core';
import { ControllerService } from './api/controller/controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Aerial Mapper';
}
