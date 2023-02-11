import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[jhiAnimationText]',
})
export class TextAnimationDirective implements OnInit {
  @Input() texts: string[] = [];
  @Input() dataPeriod = 4000;

  inlineTxt = '';
  loopNumText = 0;
  isDeleting = false;

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.tick();
  }

  tick(): void {
    const i = this.loopNumText % this.texts.length;

    this.inlineTxt = this.texts[i].substring(0, this.inlineTxt.length + (this.isDeleting ? -1 : 1));
    this.element.nativeElement.innerHTML = '<span>' + this.inlineTxt + '</span>';

    let delta = 200 - Math.random() * 100;
    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.inlineTxt === this.texts[i]) {
      delta = this.dataPeriod;
      this.isDeleting = true;
    } else if (this.isDeleting && this.inlineTxt === '') {
      this.isDeleting = false;
      this.loopNumText++;
      delta = 500;
    }

    setTimeout(() => this.tick(), delta);
  }
}
