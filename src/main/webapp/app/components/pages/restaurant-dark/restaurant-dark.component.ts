import { Component } from '@angular/core';

@Component({
  selector: 'jhi-restaurant-dark',
  templateUrl: './restaurant-dark.component.html',
  styleUrls: ['./restaurant-dark.component.scss'],
})
export class RestaurantDarkComponent {
  value: string;
  cards = [0, 0, 0, 0, 0, 0];

  constructor() {
    this.value = '';
  }
}
