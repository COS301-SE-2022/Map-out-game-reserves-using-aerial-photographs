import { Component, Inject} from '@angular/core';

@Component({
  selector: 'aerial-mapping-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})

@Inject
export class TooltipComponent {
  tooltipText = "Test text";
 
  constructor() {
    // this.tooltipText = text;
  }
}
