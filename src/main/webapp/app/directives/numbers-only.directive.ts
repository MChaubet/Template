import { Directive, HostBinding, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({ selector: '[jhiNumbersOnly]' })
export class NumbersOnlyDirective {
  @HostBinding('autocomplete')
  public autocomplete;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.autocomplete = 'off';
  }

  @HostListener('keypress', ['$event'])
  public disableKeys(e: any): boolean {
    return e.keyCode === 8 || (e.keyCode >= 48 && e.keyCode <= 57);
  }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent): void {
    // TODO autoriser le paste si le contenu est numérique
    e.preventDefault();
  }
}
