import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[jhiNumbersOnly]' })
export class NumbersOnlyDirective {
  constructor() {}

  @HostListener('keypress', ['$event'])
  public disableKeys(e: any): boolean {
    return e.keyCode === 8 || (e.keyCode >= 48 && e.keyCode <= 57);
  }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent): any {
    e.preventDefault();
  }
}
