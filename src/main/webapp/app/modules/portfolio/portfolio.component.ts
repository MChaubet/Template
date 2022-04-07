import { Component } from '@angular/core';

@Component({
  selector: 'jhi-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  value = '';

  videoSrc = ['content/images/production ID_4065948.mp4', 'content/images/production ID_4823567.mp4'];

  constructor() {
    this.value = '';
  }

  changeVideo(): void {
    this.videoSrc.reverse();

    const video = document.getElementById('video') as HTMLVideoElement;
    const source = document.getElementById('source') as HTMLSourceElement;

    source.setAttribute('src', this.videoSrc[0]);

    video.load();
    video.play().then(r => r);
  }
}
