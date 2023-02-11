import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogsComponent } from './logs/logs.component';
import { HealthComponent } from './health/health.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DocsComponent } from './docs/docs.component';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { HealthModalComponent } from './health/modal/health-modal.component';

/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

@NgModule({
  declarations: [AdminComponent, ConfigurationComponent, DocsComponent, HealthComponent, HealthModalComponent, LogsComponent],
  imports: [
    SharedModule,
    CommonModule,
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
      },
      {
        path: 'user-management',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
        data: {
          pageTitle: 'userManagement.home.title',
        },
      },
      {
        path: 'docs',
        component: DocsComponent,
      },
      {
        path: 'configuration',
        component: ConfigurationComponent,
      },
      {
        path: 'health',
        component: HealthComponent,
      },
      {
        path: 'logs',
        component: LogsComponent,
      },
      {
        path: 'metrics',
        loadChildren: () => import('./metrics/metrics.module').then(m => m.MetricsModule),
      },
      /* jhipster-needle-add-admin-route - JHipster will add admin routes here */
    ]),
  ],
})
export class AdminRoutingModule {}
