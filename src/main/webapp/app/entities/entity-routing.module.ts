import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RestaurantComponent } from 'app/modules/restaurant/restaurant.component';
import { RestaurantDarkComponent } from 'app/modules/restaurant-dark/restaurant-dark.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
      { path: 'restaurant', component: RestaurantComponent },
      { path: 'restaurant-dark', component: RestaurantDarkComponent },
    ]),
  ],
})
export class EntityRoutingModule {}
