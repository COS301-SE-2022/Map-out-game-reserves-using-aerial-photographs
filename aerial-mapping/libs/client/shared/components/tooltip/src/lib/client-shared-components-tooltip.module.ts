import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipComponent } from './tooltip/tooltip.component';

// import { HttpClientModule} from '@angular/common/http';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatIconModule } from '@angular/material/icon';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatListModule } from '@angular/material/list';
// import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    RouterModule
    // MatToolbarModule,
    // MatIconModule,
    // MatSidenavModule,
    // MatListModule,
    // MatButtonModule,
    // HttpClientModule
  ],
  declarations: [TooltipComponent],
  exports: [TooltipComponent],
})
export class ComponentsTooltipModule {}
