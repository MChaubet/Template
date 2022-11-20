import { Route } from '@angular/router';
import { AdminComponent } from './admin.component';

export const adminRoute: Route = {
  path: '',
  component: AdminComponent,
  data: {
    pageTitle: 'global.menu.admin.main',
  },
};
