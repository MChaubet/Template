import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './components/layouts/error/error.route';
import { navbarRoute } from './components/layouts/navbar/navbar.route';
import { Authority } from 'app/constants/authority.constants';

import { UserRouteAccessService } from 'app/services/user-route-access.service';
import { KafkaComponent } from './modules/kafka/kafka.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'kafka',
        component: KafkaComponent,
      },
      {
        path: 'admin',
        data: { authorities: [Authority.ADMIN] },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./components/admin/admin-routing.module').then(m => m.AdminRoutingModule),
      },
      {
        path: 'account',
        loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule),
      },
      {
        path: 'login',
        loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
      },
      {
        path: '',
        loadChildren: () => import(`./components/pages/pages.module`).then(m => m.PagesModule),
      },
      navbarRoute,
      ...errorRoute,
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
