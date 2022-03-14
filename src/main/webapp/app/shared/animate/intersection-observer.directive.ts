import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[jhiAnimation]',
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
  @Input() threshold = 0.5;
  @Input() intersectionRootMargin = '0px';
  @Input() intersectionRoot?: HTMLElement;

  @Input() animationInfinity = false;
  @Input() animationType = 'fade-in';
  @Input() animationOutType?: string;

  private intersectionObserver?: IntersectionObserver;

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(this.animationType);
            if (this.animationOutType) {
              entry.target.classList.remove(this.animationOutType);
            }
          } else {
            if (this.animationInfinity) {
              entry.target.classList.remove(this.animationType);
            }
            if (this.animationOutType) {
              entry.target.classList.add(this.animationOutType);
            }
          }
        });
      },
      {
        threshold: this.threshold,
        root: this.intersectionRoot,
        rootMargin: this.intersectionRootMargin,
      }
    );
    this.intersectionObserver.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
  }
}
