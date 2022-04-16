import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantComponent } from 'app/modules/restaurant/restaurant.component';
import { RestaurantDarkComponent } from 'app/modules/restaurant-dark/restaurant-dark.component';
import { PortfolioComponent } from 'app/modules/portfolio/portfolio.component';
import { ShoppingComponent } from 'app/modules/shopping/shopping.component';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [
  {
    path: 'restaurant',
    component: RestaurantComponent,
  },
  {
    path: 'restaurant-dark',
    component: RestaurantDarkComponent,
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
  },
  {
    path: 'shopping',
    component: ShoppingComponent,
  },
];

@NgModule({
  declarations: [RestaurantComponent, RestaurantDarkComponent, PortfolioComponent, ShoppingComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class ModulesModule {}
