import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { ComponentsNavbarModule } from '@aerial-mapping/client/shared/components/navbar';
import { AccountRoutingModule } from './account-routing.module';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [
    CommonModule,
    ComponentsNavbarModule,
    AccountRoutingModule,
    MatCardModule
  ],
  declarations: [AccountComponent],
  exports: [AccountComponent]
})
export class ClientAccountModule {}
