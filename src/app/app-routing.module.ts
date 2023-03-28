import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginGuard } from './guard/login-guard';
import { CloseWebsocket } from './guard/close-websocket'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'three-d',
    loadChildren: () =>
      import('./three-d/three-d.module').then((m) => m.ThreeDModule),
    canActivate: [LoginGuard],
    canDeactivate: [CloseWebsocket]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
