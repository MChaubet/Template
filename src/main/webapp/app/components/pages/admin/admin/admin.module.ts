import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/components/shared/shared.module';
import { AdminComponent } from './admin.component';

const adminRoute: Route = {
  path: '',
  component: AdminComponent,
  data: {
    pageTitle: 'global.menu.admin.main',
  },
};

@NgModule({
  imports: [SharedModule, RouterModule.forChild([adminRoute])],
  declarations: [AdminComponent],
})
export class AdminModule {}
