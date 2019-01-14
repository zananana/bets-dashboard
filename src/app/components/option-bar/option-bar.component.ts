import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyService } from 'src/app/services/currency/currency.service';

@Component({
  selector: 'app-option-bar',
  templateUrl: './option-bar.component.html',
  styleUrls: ['./option-bar.component.scss']
})
export class OptionBarComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    public service: CurrencyService
  ) { }

  @Output()
  public currencyStateChanged: EventEmitter<boolean> = new EventEmitter();

  public activeLang = 'en';

  public activeCurrency = 'USD';

  changeLanguage(lang) {
    this.translate.use(lang);
    this.activeLang = lang;
  }

  changeCurrency(curr) {
    this.service.activeCurrency = curr;
    this.activeCurrency = curr;

    this.currencyStateChanged.emit(curr);
  }

  ngOnInit() {
  }

}
