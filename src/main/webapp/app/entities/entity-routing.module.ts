import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RestaurantComponent } from 'app/restaurant/restaurant.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
      { path: 'restaurant', component: RestaurantComponent },
    ]),
  ],
})
export class EntityRoutingModule {}
