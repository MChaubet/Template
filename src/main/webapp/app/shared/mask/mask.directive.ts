import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[jhiMask]',
})
export class MaskDirective {
  @Input() ngxMask?: string;

  readonly _formatToRegExp = [
    { id: '0', regExp: /[0-9]/ },
    { id: 'a', regExp: /[a-z]/ },
    { id: 'A', regExp: /[A-Z]/ },
    { id: 'B', regExp: /[a-zA-Z]/ },
  ];
  readonly _allFormatsStr =
    '(' +
    this._formatToRegExp
      .map(value => value.regExp.toString())
      .map(regexStr => regexStr.substring(1, regexStr.length - 1))
      .join('|') +
    ')';
  readonly _allFormatsGlobal = new RegExp(this._allFormatsStr, 'g');

  private _lastMaskedValue = '';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(): void {
    this.el.nativeElement.value = this._maskValue(this.el.nativeElement.value);
  }

  _maskValue(val: string): string {
    if (!val || !this.ngxMask || val === this._lastMaskedValue) {
      return val;
    }
    this._lastMaskedValue = this.valueToFormat(val, this.ngxMask);
    return this._lastMaskedValue;
  }

  /**
   * Apply format to a value string
   *
   * Format can be constructed from next symbols:
   *  - '0': /[0-9]/,
   *  - 'a': /[a-z]/,
   *  - 'A': /[A-Z]/,
   *  - 'B': /[a-zA-Z]/
   *
   * Example: 'AAA-00BB-aaaa'
   * will accept 'COD-12Rt-efww'
   *
   * @param value Current value
   * @param format Format
   */
  valueToFormat(value: string, format: string): string {
    const unmaskedValue = this.unmaskValue(value);
    const maskedValueArray = unmaskedValue.split('');
    for (let formatCharPosition = 0; formatCharPosition < format.length; formatCharPosition++) {
      const valueChar = maskedValueArray[formatCharPosition];
      // Do skip position if no value was inputted at this position
      if (!valueChar) {
        continue;
      }

      const formatChar: string = format[formatCharPosition];
      const formatRegex = this.getFormatRegexp(formatChar);

      this.deleteIfNotMatchRegExp(formatRegex, valueChar, maskedValueArray, formatCharPosition);
      this.addSeparator(formatChar, formatRegex, maskedValueArray, formatCharPosition);
    }

    // Join all parsed value, limiting length to the one specified in format
    return maskedValueArray.join('').substring(0, format.length);
  }

  addSeparator(formatChar: string, formatRegex: RegExp | null, maskedValueArray: string[], formatCharPosition: number): void {
    if (formatChar && !formatRegex) {
      maskedValueArray.splice(formatCharPosition, 0, formatChar);
    }
  }

  deleteIfNotMatchRegExp(formatRegex: RegExp | null, valueChar: string, maskedValueArray: string[], formatCharPosition: number): void {
    if (formatRegex && !formatRegex.test(valueChar)) {
      maskedValueArray.splice(formatCharPosition, 1);
    }
  }

  unmaskValue(value: string): string {
    const unmaskedMathes = value.replace(' ', '').match(this._allFormatsGlobal);
    return unmaskedMathes ? unmaskedMathes.join('') : '';
  }

  getFormatRegexp(formatChar: any): RegExp | null {
    if (formatChar) {
      const filterRegexp = this._formatToRegExp.filter(value => value.id === formatChar);
      return filterRegexp.length ? filterRegexp[0].regExp : null;
    }
    return null;
  }
}
