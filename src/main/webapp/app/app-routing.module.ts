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
        loadChildren: () => import('./components/pages/admin/admin-routing.module').then(m => m.AdminRoutingModule),
      },
      {
        path: 'account',
        loadChildren: () => import('./components/pages/account/account.module').then(m => m.AccountModule),
      },
      {
        path: 'login',
        loadChildren: () => import('./components/pages/login/login.module').then(m => m.LoginModule),
      },
      {
        path: 'showcase',
        loadChildren: () => import(`app/components/pages/showcase.module`).then(m => m.ShowcaseModule),
      },
      navbarRoute,
      ...errorRoute,
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
