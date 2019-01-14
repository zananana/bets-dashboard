import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BetsTableComponent } from './bets-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { OptionBarComponent } from '../option-bar/option-bar.component';
import { CurrencyChangePipe } from 'src/app/pipes/currency-change.pipe';
import { HttpClient } from '@angular/common/http';

describe('BetsTableComponent', () => {
  let component: BetsTableComponent;
  let fixture: ComponentFixture<BetsTableComponent>;
  let compile: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
        BetsTableComponent,
        OptionBarComponent,
        CurrencyChangePipe,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compile = fixture.debugElement.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "app-option-bar"', () => {
    expect(compile.querySelector('app-option-bar')).toBeTruthy();
  });

  it('should render two buttons', () => {
    expect(compile.getElementsByClassName('btn--start_pulling')).toBeTruthy();
    expect(compile.getElementsByClassName('btn--stop_pulling')).toBeTruthy();
  });

  it('should render table', () => {
    expect(compile.getElementsByClassName('block__content')).toBeTruthy();
  });

  describe('on start button click', function() {

    it('should call the function "startLiveUpdates" on button "btn--start_pulling"', function() {
      const expected = true;
      spyOn(component, 'startLiveUpdates').and.callThrough();

      const buttons = compile.getElementsByClassName('btn--start_pulling');
      buttons[0].click();

      expect(component.startLiveUpdates).toHaveBeenCalled();
      expect(component.liveUpdates).toBe(expected);
    });
  });

  describe('on stop button click', function() {

    it('should call the function "stopLiveUpdates" on button "btn--stop_pulling"', function() {
      const expected = false;

      component.liveUpdates = true;
      fixture.detectChanges();

      spyOn(component, 'stopLiveUpdates').and.callThrough();

      const buttons = compile.getElementsByClassName('btn--stop_pulling');
      buttons[0].click();

      expect(component.stopLiveUpdates).toHaveBeenCalled();
      expect(component.liveUpdates).toBe(expected);
    });
  });


});
