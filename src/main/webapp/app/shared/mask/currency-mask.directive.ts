import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

export enum CurrencyCodeEnum {
  EUR = 'EUR',
  USD = 'USD',
}

@Directive({
  selector: '[jhiCurrencyMask]',
})
export class CurrencyMaskDirective implements OnInit {
  @Input() currencyCode = CurrencyCodeEnum.USD;
  lang = this.translateService.currentLang;
  elem: any;

  constructor(private el: ElementRef, private translateService: TranslateService, private currencyPipe: CurrencyPipe) {
    this.elem = el.nativeElement;

    this.currencyCode = this.selectLangCurrency();
    this.translateService.onLangChange.subscribe({
      next: (result: LangChangeEvent) => {
        this.onFocus();

        this.lang = result.lang;
        this.currencyCode = this.selectLangCurrency();

        this.onBlur();
      },
      error: () => (this.currencyCode = CurrencyCodeEnum.EUR),
    });
  }

  selectLangCurrency(): CurrencyCodeEnum {
    return this.lang === 'fr' ? CurrencyCodeEnum.EUR : CurrencyCodeEnum.USD;
  }

  ngOnInit(): void {
    this.format(this.elem.value);
  }

  @HostListener('blur')
  onBlur(): void {
    const value = this.elem.value.replace(/\s/g, '').replace(/,/gm, this.lang === 'en' ? '' : '.');
    this.format(!Number.isNaN(Number(value)) ? Number.parseFloat(value).toFixed(2) : '');
  }

  @HostListener('focus')
  onFocus(): void {
    this.elem.value = this.elem.value.replace(/[^0-9,.]+/g, '').replace(/,/gm, this.lang === 'en' ? '' : '.');
  }

  format(val: string): void {
    this.elem.value = this.currencyPipe.transform(val, this.currencyCode, 'symbol', '1.2-2', this.lang);
  }
}
