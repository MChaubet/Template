import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './components/layouts/error/error.route';
import { navbarRoute } from './components/layouts/navbar/navbar.route';
import { Authority } from 'app/constants/authority.constants';

import { UserRouteAccessService } from 'app/services/user-route-access.service';

@NgModule({
  imports: [
    RouterModule.forRoot([
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
        path: 'modules',
        data: { authorities: [Authority.USER] },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import(`./components/pages/modules.module`).then(m => m.ModulesModule),
      },
      navbarRoute,
      ...errorRoute,
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
