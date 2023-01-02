import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantComponent } from 'app/components/pages/showcase/restaurant/restaurant.component';
import { RestaurantDarkComponent } from 'app/components/pages/showcase/restaurant-dark/restaurant-dark.component';
import { PortfolioComponent } from 'app/components/pages/showcase/portfolio/portfolio.component';
import { ShoppingComponent } from 'app/components/pages/showcase/shopping/shopping.component';
import { SharedModule } from 'app/components/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { shoppingFeatureKey, shoppingReducer } from 'app/components/pages/showcase/shopping/store/shopping-reducer';
import { ShoppingCartComponent } from './showcase/shopping/shopping-cart/shopping-cart.component';
import { ArticleModalComponent } from 'app/components/pages/showcase/shopping/article-modal-component';
import { InvoiceComponent } from './showcase/invoice/invoice.component';
import { PricingComponent } from './showcase/pricing/pricing.component';
import { BakeryComponent } from './showcase/bakery/bakery.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { SidenavComponent } from '../layouts/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: ShowcaseComponent,
    children: [
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
        path: 'invoice',
        component: InvoiceComponent,
      },
      {
        path: 'pricing',
        component: PricingComponent,
      },
      {
        path: 'bakery',
        component: BakeryComponent,
      },
    ],
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
    InvoiceComponent,
    PricingComponent,
    BakeryComponent,
    ShowcaseComponent,
    SidenavComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes), StoreModule.forFeature(shoppingFeatureKey, shoppingReducer)],
})
export class ShowcaseModule {}
