import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../services/currency/currency.service';

@Pipe({
  name: 'currencyChange'
})
export class CurrencyChangePipe implements PipeTransform {

  constructor(
    public service: CurrencyService
  ) {}

  transform(value: number, symbol: string): string {

    return (Math.round((value * this.service.aciveCurrencyRate) * 100) / 100).toFixed(2) + ' ' + symbol;

  }

}
