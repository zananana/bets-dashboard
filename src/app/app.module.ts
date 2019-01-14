import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { OptionBarComponent } from 'src/app/components/option-bar/option-bar.component';
import { BetsTableComponent } from './components/bets-table/bets-table.component';
import { CurrencyChangePipe } from './pipes/currency-change.pipe';
import { BetsService } from './services/bets/bets.service';
import { CurrencyService } from './services/currency/currency.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    BetsTableComponent,
    OptionBarComponent,
    CurrencyChangePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    BetsService,
    CurrencyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
