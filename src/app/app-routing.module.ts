import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ImageCatalogueComponent } from './components/image-catalogue/image-catalogue.component';
import { LoginComponent } from './components/login/login.component';
import { MapcollectionComponent } from './components/map-collections/map-collections.component';
import { MapComponent } from './components/map/map.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  { path: 'map-collections', component: MapcollectionComponent },
  { path: 'map', component: MapComponent },
  { path: 'image-catalogue', component: ImageCatalogueComponent },
  { path: 'file-upload', component: FileUploadComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
