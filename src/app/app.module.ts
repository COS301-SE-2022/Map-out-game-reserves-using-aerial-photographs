import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import { RegisterModule } from './components/register/register.module';
import { DashboardModule } from './components/dashboard/dashboard.module';

import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AccountModule } from './components/account/account.module';
import { NavbarModule } from './components/shared/navbar/navbar.module';
import { FooterModule } from './components/shared/footer/footer.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MapModule } from './components/map/map.module';
import { FileUploadModule } from './components/file-upload/file-upload.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { ImageCatalogueModule } from './components/image-catalogue/image-catalogue.module';
import { MatInputModule } from '@angular/material/input';
import { ControllerService } from './api/controller/controller.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import { SpinnerModule } from './components/shared/spinner/spinner.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterModule,
    RouterModule,
    DashboardModule,
    LoginModule,
    AccountModule,
    NavbarModule,
    FooterModule,
    MapModule,
    FileUploadModule,
    ImageCatalogueModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatListModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatButtonModule,
    NgChartsModule,
    FontAwesomeModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatDividerModule,
    SpinnerModule
  ],
  providers: [
    HttpClient,
    MatDialog,
    MatSnackBar,
    ControllerService,
    {
      provide: MatDialogRef,
      useValue: {}
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
