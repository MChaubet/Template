import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { SharedLibsModule } from '../shared/shared-libs.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainComponent, SidenavComponent, FooterComponent, ErrorComponent],
  exports: [MainComponent, SidenavComponent, FooterComponent, ErrorComponent],
  imports: [CommonModule, SharedModule, SharedLibsModule, RouterModule],
})
export class LayoutsModule {}
