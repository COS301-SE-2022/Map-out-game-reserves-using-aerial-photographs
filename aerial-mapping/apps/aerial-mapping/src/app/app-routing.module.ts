import { LoginGuard } from '@aerial-mapping/client/login';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@aerial-mapping/client/dashboard').then(
        (x) => x.ClientDashboardModule
      ),
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@aerial-mapping/client/login').then(
        (x) => x.ClientLoginModule
      )
  },
  {
    path: 'register',
    loadChildren: () =>
      import('@aerial-mapping/client/register').then(
        (x) => x.ClientRegisterModule
      )
  },
  {
    path: 'file-upload',
    loadChildren: () =>
      import('@aerial-mapping/client/file-upload').then(
        (x) => x.ClientFileUploadModule
      ),
    canActivate: [LoginGuard]
  },
  {
    path: 'account',
    loadChildren: () =>
    import('@aerial-mapping/client/account').then(
        (x) => x.ClientAccountModule
      ),
    canActivate: [LoginGuard]
  },
  {
    path: 'map-collection',
    loadChildren: () =>
    import('@aerial-mapping/client/mapcollection').then(
        (x) => x.ClientMapcollectionModule
      ),
    canActivate: [LoginGuard]
  },
  {
    path: 'image-catalogue',
    loadChildren: () =>
    import('@aerial-mapping/client/image-catalogue').then(
        (x) => x.ClientImageCatalogueModule
      ),
    canActivate: [LoginGuard]
  },
  {
    path: 'map',
    loadChildren: () =>
      import('@aerial-mapping/client/map').then(
        (x) => x.ClientMapModule
      ),
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard],
})
export class AppRoutingModule {}
