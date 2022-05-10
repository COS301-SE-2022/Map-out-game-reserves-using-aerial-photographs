import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { MaterialModule } from './materials/material.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialModule
  ],
  declarations: [RegisterComponent],
})
export class ClientRegisterModule {}
