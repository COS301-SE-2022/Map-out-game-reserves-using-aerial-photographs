import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@aerial-mapping/client/dashboard').then(
        (x) => x.ClientDashboardModule
      ),
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
