import { Component } from '@angular/core';

@Component({
  selector: 'jhi-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent {
  title: string;
  text: string;
  photos = [
    {
      img: 'https://cdn.discordapp.com/attachments/960641870382374943/961326574941126686/lac.jpg',
      desc: 'restaurant.carousel.description1',
    },
    {
      img: 'https://cdn.discordapp.com/attachments/960641870382374943/961326575461232730/montagne.jpg',
      desc: 'restaurant.carousel.description2',
    },
    {
      img: 'https://cdn.discordapp.com/attachments/960641870382374943/961326576568500294/ville.jpg',
      desc: 'restaurant.carousel.description3',
    },
  ];

  images = [1, 2, 3].map(n => `content/images/carousel${n}.jpg`);

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
