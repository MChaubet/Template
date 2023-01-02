import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/services/user-route-access.service';
import { SettingsComponent } from './settings.component';

export const settingsRoute: Route = {
  path: 'settings',
  component: SettingsComponent,
  data: {
    pageTitle: 'global.menu.account.settings',
  },
  canActivate: [UserRouteAccessService],
};
