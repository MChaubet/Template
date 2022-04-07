import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RestaurantComponent } from 'app/modules/restaurant/restaurant.component';
import { RestaurantDarkComponent } from 'app/modules/restaurant-dark/restaurant-dark.component';
import { PortfolioComponent } from 'app/modules/portfolio/portfolio.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
      { path: 'restaurant', component: RestaurantComponent },
      { path: 'restaurant-dark', component: RestaurantDarkComponent },
      { path: 'portfolio', component: PortfolioComponent },
    ]),
  ],
})
export class EntityRoutingModule {}
