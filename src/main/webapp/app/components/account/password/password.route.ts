import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/services/user-route-access.service';
import { PasswordComponent } from './password.component';

export const passwordRoute: Route = {
  path: 'password',
  component: PasswordComponent,
  data: {
    pageTitle: 'global.menu.account.password',
  },
  canActivate: [UserRouteAccessService],
};
