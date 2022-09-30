import { Component } from '@angular/core';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
} from '@angular/material/tooltip';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 500,
  touchendHideDelay: 1000,
};
@Component({
  selector: 'aerial-mapping-side-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults },
  ],
})
export class NavbarComponent {
  constructor() {
    window.addEventListener('popstate', function () {
      setTimeout(() => {
        window.location.reload();
      }, 1);
    });
  }

  onClick(id: string): void {
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }
}
