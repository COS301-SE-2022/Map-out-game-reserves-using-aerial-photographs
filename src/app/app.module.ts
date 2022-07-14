import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import { RegisterModule } from './components/register/register.module';
import { DashboardModule } from './components/dashboard/dashboard.module';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterModule,
    DashboardModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
