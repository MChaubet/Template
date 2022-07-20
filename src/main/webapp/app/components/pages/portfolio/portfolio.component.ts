import { Component } from '@angular/core';

@Component({
  selector: 'jhi-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  videoSrc = ['content/images/production ID_4065948.mp4', 'content/images/production ID_4823567.mp4'];
  text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex';
  textMin = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';

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
      { photo: 'content/images/ecology1.jpg', title: 'Montagne', text: this.textMin },
      { photo: 'content/images/ecology2.jpg', title: 'Eau', text: this.textMin },
      { photo: 'content/images/ecology3.jpg', title: 'Vie', text: this.textMin },
      { photo: 'content/images/ecology2.jpg', title: 'Eau', text: this.textMin },
      { photo: 'content/images/ecology3.jpg', title: 'Vie', text: this.textMin },
      { photo: 'content/images/ecology1.jpg', title: 'Montagne', text: this.textMin },
    ];

    this.newsList = [
      { title: 'Awesome Employers', date: '01 January, 2020', desc: this.text },
      { title: 'New Web Design', date: '03 January, 2020', desc: this.text },
      { title: 'Beautiful render', date: '10 January, 2020', desc: this.text },
    ];
  }

  // changeVideo(): void {
  //   const video = document.getElementById('video') as HTMLVideoElement;
  //   const source = document.getElementById('source') as HTMLSourceElement;
  //
  //   source.setAttribute('src', this.videoSrc.reverse()[0]);
  //   video.load();
  //   video.play().then(r => r);
  // }
}
