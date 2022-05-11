import { Component } from '@angular/core';
import { faPaperPlane as plane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'aerial-mapping-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent {
  plane = plane;
  total = 253;
} 