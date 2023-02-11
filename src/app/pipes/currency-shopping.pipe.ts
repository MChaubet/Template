import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currencyShoping'
})
export class CurrencyShopingPipe implements PipeTransform {

  transform(value: number): any {
    const euros = Math.floor(value);
    const cents = Math.round((value - euros) * 100);
    return `${euros}€${cents.toString().padStart(2, '0')}`;
  }
  // todo mater comment mettre les centimes plus petits dans le html

}