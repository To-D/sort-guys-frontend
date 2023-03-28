import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';

import { LogoutGuard } from '../guard/logout-guard';
import { LoginGuard } from '../guard/login-guard';

const userRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LogoutGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LogoutGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
})
export class UserRoutingModule {}
