import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login/login.component';
import { RouterModule } from '@angular/router';
import { KafkaComponent } from './kafka/kafka.component';
import { SharedModule } from '../shared/shared.module';
import { SharedLibsModule } from '../shared/shared-libs.module';
import { LayoutsModule } from '../layouts/layouts.module';
import { UserRouteAccessService } from '../../services/user-route-access.service';
import { Authority } from '../../constants/authority.constants';

const PAGES_ROUTES = [
  {
    path: '',
    component: HomeComponent,
    data: {
      pageTitle: 'home.title',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      pageTitle: 'login.title',
    },
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
  },
  {
    path: 'admin',
    data: { authorities: [Authority.ADMIN] },
    canActivate: [UserRouteAccessService],
    loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
  },
  {
    path: 'showcase',
    loadChildren: () => import(`./showcase/showcase.module`).then(m => m.ShowcaseModule),
  },
  {
    path: 'kafka',
    component: KafkaComponent,
  },
];

@NgModule({
  declarations: [HomeComponent, LoginComponent],
  imports: [RouterModule.forChild(PAGES_ROUTES), CommonModule, LayoutsModule, SharedModule, SharedLibsModule],
})
export class PagesModule {}
