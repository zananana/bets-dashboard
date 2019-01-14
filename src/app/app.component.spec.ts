import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.module';
import { BetsTableComponent } from './components/bets-table/bets-table.component';
import { OptionBarComponent } from './components/option-bar/option-bar.component';
import { CurrencyChangePipe } from './pipes/currency-change.pipe';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BetsService } from './services/bets/bets.service';
import { CurrencyService } from './services/currency/currency.service';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compile: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      declarations: [
        AppComponent,
        BetsTableComponent,
        OptionBarComponent,
        CurrencyChangePipe
      ],
      providers: [
        BetsService,
        CurrencyService
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compile = fixture.debugElement.nativeElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render "app-bets-table"', () => {
    expect(compile.querySelector('app-bets-table')).toBeTruthy();
  });

});
