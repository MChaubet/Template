import { Routes } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { UserRouteAccessService } from '../../../services/user-route-access.service';
import { RegisterComponent } from './register/register.component';
import { PasswordComponent } from './password/password.component';
import { ActivateComponent } from './activate/activate.component';
import { PasswordResetInitComponent } from './password-reset/init/password-reset-init.component';
import { PasswordResetFinishComponent } from './password-reset/finish/password-reset-finish.component';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: 'activate',
    component: ActivateComponent,
    data: {
      pageTitle: 'activate.title',
    },
  },
  {
    path: 'reset/finish',
    component: PasswordResetFinishComponent,
    data: {
      pageTitle: 'global.menu.account.password',
    },
  },
  {
    path: 'reset/request',
    component: PasswordResetInitComponent,
    data: {
      pageTitle: 'global.menu.account.password',
    },
  },
  {
    path: 'password',
    component: PasswordComponent,
    data: {
      pageTitle: 'global.menu.account.password',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      pageTitle: 'register.title',
    },
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      pageTitle: 'global.menu.account.settings',
    },
    canActivate: [UserRouteAccessService],
  },
];
