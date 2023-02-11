import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RestaurantComponent} from 'app/components/pages/showcase/restaurant/restaurant.component';
import {RestaurantDarkComponent} from 'app/components/pages/showcase/restaurant-dark/restaurant-dark.component';
import {PortfolioComponent} from 'app/components/pages/showcase/portfolio/portfolio.component';
import {ShoppingComponent} from 'app/components/pages/showcase/shopping/shopping.component';
import {SharedModule} from 'app/components/shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {shoppingFeatureKey, shoppingReducer} from 'app/components/pages/showcase/shopping/store/shopping-reducer';
import {ShoppingCartComponent} from './shopping/shopping-cart/shopping-cart.component';
import {ArticleModalComponent} from 'app/components/pages/showcase/shopping/article-modal-component';
import {InvoiceComponent} from './invoice/invoice.component';
import {PricingComponent} from './pricing/pricing.component';
import {BakeryComponent} from './bakery/bakery.component';
import {ShowcaseComponent} from './showcase.component';
import {LayoutsModule} from '../../layouts/layouts.module';
import {AccountModule} from "../account/account.module";
import {ShoppingFilterComponent} from './shopping/shopping-filter/shopping-filter.component';
import {ShoppingArticlesComponent} from './shopping/shopping-articles/shopping-articles.component';
import {ShoppingHeaderComponent} from './shopping/shopping-header/shopping-header.component';
import {ShoppingBreadcrumbComponent} from './shopping/shopping-breadcrumb/shopping-breadcrumb.component';
import {ShoppingFilterPanelComponent} from './shopping/shopping-filter/shopping-filter-panel/shopping-filter-panel.component';
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {ShoppingFooterComponent} from './shopping/shopping-footer/shopping-footer.component';
import {SharedLibsModule} from "../../shared/shared-libs.module";
import {ShowcaseGuard} from "../../../guards/showcase.guard";
import {NavbarComponent} from "../../layouts/navbar/navbar.component";

const routes: Routes = [
  {
    path: '',
    component: ShowcaseComponent,
    canActivate: [ShowcaseGuard],
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
    ShoppingFilterComponent,
    ShoppingArticlesComponent,
    ShoppingHeaderComponent,
    ShoppingBreadcrumbComponent,
    ShoppingFilterPanelComponent,
    ShoppingFooterComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedLibsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(shoppingFeatureKey, shoppingReducer),
    LayoutsModule,
    AccountModule,
    NgxSliderModule
  ],
})
export class ShowcaseModule {
}
