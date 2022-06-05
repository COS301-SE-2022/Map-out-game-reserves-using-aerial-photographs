import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RegisterRoutingModule } from './register-routing.module';
// import { MaterialModule } from './materials/material.module';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import { ClientApiService } from '@aerial-mapping/client/shared/services';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    // MaterialModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule
  ],
  declarations: [RegisterComponent],
  providers: [ClientApiService]
})
export class ClientRegisterModule {}
