import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currencyShoping'
})
export class CurrencyShopingPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) {
      return '0.00 €';
    }

    const formattedValue = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: false }).format(value);
    return formattedValue.replace(',', '.');
  }

}