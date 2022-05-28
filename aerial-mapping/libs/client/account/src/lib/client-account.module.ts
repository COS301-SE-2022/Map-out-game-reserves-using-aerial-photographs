import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { ComponentsNavbarModule } from '@aerial-mapping/client/shared/components/navbar';
import { AccountRoutingModule } from './account-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  imports: [
    CommonModule,
    ComponentsNavbarModule,
    AccountRoutingModule,
    MatCardModule,
    MatIconModule, 
    MatButtonModule
  ],
  declarations: [AccountComponent],
  exports: [AccountComponent]
})
export class ClientAccountModule {}
