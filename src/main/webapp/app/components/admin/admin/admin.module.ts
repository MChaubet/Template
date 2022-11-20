import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/components/shared/shared.module';

import { adminRoute } from './admin.route';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([adminRoute])],
  declarations: [AdminComponent],
})
export class AdminModule {}
