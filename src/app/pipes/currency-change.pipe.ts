import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../services/currency/currency.service';

@Pipe({
  name: 'currencyChange'
})
export class CurrencyChangePipe implements PipeTransform {

  constructor(
    public service: CurrencyService
  ) {}

  transform(value: number): string {

    if (this.service.activeCurrency === 'USD') {
      return '$ ' + (Math.round((value) * 100) / 100).toFixed(2);
    } else if (this.service.activeCurrency === 'PLN') {
      return (Math.round((value * this.service.PlnExchangeRate) * 100) / 100).toFixed(2) + ' zł';
    } else {
      return '$ ' + (Math.round((value) * 100) / 100).toFixed(2);
    }
  }

}
