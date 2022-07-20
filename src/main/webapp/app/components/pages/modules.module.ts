import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantComponent } from 'app/components/pages/restaurant/restaurant.component';
import { RestaurantDarkComponent } from 'app/components/pages/restaurant-dark/restaurant-dark.component';
import { PortfolioComponent } from 'app/components/pages/portfolio/portfolio.component';
import { ShoppingComponent } from 'app/components/pages/shopping/shopping.component';
import { SharedModule } from 'app/components/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { shoppingFeatureKey, shoppingReducer } from 'app/components/pages/shopping/store/shopping-reducer';
import { ShoppingCartComponent } from './shopping/shopping-cart/shopping-cart.component';
import { ArticleModalComponent } from 'app/components/pages/shopping/article-modal-component';
import { ManagementAppComponent } from './management-app/management-app.component';
import { PricingComponent } from './pricing/pricing.component';

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
  {
    path: 'management-app',
    component: ManagementAppComponent,
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
];

@NgModule({
  declarations: [
    RestaurantComponent,
    RestaurantDarkComponent,
    PortfolioComponent,
    ShoppingComponent,
    ShoppingCartComponent,
    ArticleModalComponent,
    ManagementAppComponent,
    PricingComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes), StoreModule.forFeature(shoppingFeatureKey, shoppingReducer)],
})
export class ModulesModule {}
