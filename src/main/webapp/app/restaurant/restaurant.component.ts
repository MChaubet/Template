import { Component } from '@angular/core';

@Component({
  selector: 'jhi-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent {
  title: string;
  text: string;
  images = [944, 1011, 984].map(n => `https://picsum.photos/id/${n}/900/500`);

  constructor() {
    this.title = 'Title';
    this.text =
      'Lorem ipsum dolor sit amet. Qui debitis modi aut consequatur enim sit ' +
      'Quis amet et eligendi omnis sit corrupti consequuntur hic quibusdam molestiae. ' +
      'Aut minus incidunt aut nobis commodi et minima explicabo a esse galisum est rerum ' +
      'numquam non consequuntur consequatur et adipisci voluptas. ' +
      'Est praesentium voluptas nam voluptate exercitationem aut earum cumque.';
  }
}
