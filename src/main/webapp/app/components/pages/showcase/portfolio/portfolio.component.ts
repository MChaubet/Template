import { Component } from '@angular/core';

@Component({
  selector: 'jhi-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  videoSrc = ['content/images/production ID_4065948.mp4', 'content/images/production ID_4823567.mp4'];
  text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex';

  items: any[] = [];
  photos: any[] = [];
  newsList: any[] = [];
  rate = 5;

  constructor() {
    this.items = [
      { title: 'Arbre', text: this.text },
      { title: 'Bonbon', text: this.text },
      { title: 'Goutte', text: this.text },
    ];

    this.photos = [
      { photo: 'content/images/showcase/portfolio/ecology1.jpg', title: 'Montagne', text: this.text },
      { photo: 'content/images/showcase/portfolio/ecology2.jpg', title: 'Eau', text: this.text },
      { photo: 'content/images/showcase/portfolio/ecology3.jpg', title: 'Vie', text: this.text },
      { photo: 'content/images/showcase/portfolio/ecology2.jpg', title: 'Eau', text: this.text },
      { photo: 'content/images/showcase/portfolio/ecology3.jpg', title: 'Vie', text: this.text },
      { photo: 'content/images/showcase/portfolio/ecology1.jpg', title: 'Montagne', text: this.text },
    ];

    this.newsList = [
      { title: 'Awesome Employers', date: '01 January, 2020', desc: this.text },
      { title: 'New Web Design', date: '03 January, 2020', desc: this.text },
      { title: 'Beautiful render', date: '10 January, 2020', desc: this.text },
    ];
  }
}
