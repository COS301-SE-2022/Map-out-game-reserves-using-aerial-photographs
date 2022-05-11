import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { ComponentsNavbarModule } from './../../../shared/components/navbar/src/lib/client-shared-components-navbar.module';

@NgModule({
  imports: [CommonModule, ComponentsNavbarModule],
  declarations: [AccountComponent],
  exports: [AccountComponent]
})
export class ClientAccountModule {}
