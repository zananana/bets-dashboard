import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }

  public PlnExchangeRate = 3.74;

  public activeCurrency = 'USD';

}
