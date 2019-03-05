import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICurrency } from 'src/app/interfaces/ICurrency';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  private url = environment.currencyApiUrl;

  public activeCurrency = 'EUR';

  public aciveCurrencyRate = 1;

  public getCurrency(symbol: string): Observable<ICurrency> {
    const url = this.url + '&symbols=' + symbol;
    return this.http.get<ICurrency>(url);
  }


}
