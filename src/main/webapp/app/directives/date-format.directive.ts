import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[jhiDateFormat]',
})
export class DateFormatDirective {
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): any {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);

    if (next.length === 3 || next.length === 6) {
      event.key === '/' ? event.preventDefault() : (this.el.nativeElement.value += '/');
    } else if (!event.key.match(/\d/g)) {
      event.preventDefault();
    }
  }
}
