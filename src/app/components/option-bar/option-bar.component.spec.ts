import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionBarComponent } from './option-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('OptionBarComponent', () => {
  let component: OptionBarComponent;
  let fixture: ComponentFixture<OptionBarComponent>;
  let compile: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
      ],
      declarations: [
        OptionBarComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OptionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compile = fixture.debugElement.nativeElement;
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render four buttons', () => {
    expect(compile.getElementsByClassName('btn').length).toBe(4);
  });

  it('should call a function on click', () => {

  });

  describe('on button click', function() {

    it('should call the function "changeLanguage" on button 1 and change language to "pl"', function() {
      spyOn(component, 'changeLanguage').and.callThrough();

      const buttons = compile.getElementsByClassName('btn');
      buttons[0].click();

      expect(component.changeLanguage).toHaveBeenCalledWith('pl');
      expect(component.activeLang).toBe('pl');
    });

    it('should call the function "changeLanguage" on button 2 and change langugae to "en"', function() {
      spyOn(component, 'changeLanguage').and.callThrough();

      const buttons = compile.getElementsByClassName('btn');
      buttons[1].click();

      expect(component.changeLanguage).toHaveBeenCalledWith('en');
      expect(component.activeLang).toBe('en');
    });

    it('should call the function "changeCurrency" on button 3 and change currency to "USD"', function() {
      spyOn(component, 'changeCurrency').and.callThrough();

      const buttons = compile.getElementsByClassName('btn');
      buttons[2].click();

      expect(component.changeCurrency).toHaveBeenCalledWith('USD');
      expect(component.activeCurrency).toBe('USD');
    });

    it('should call the function "changeCurrency" on button 3 and change currency to "PLN"', function() {
      spyOn(component, 'changeCurrency').and.callThrough();

      const buttons = compile.getElementsByClassName('btn');
      buttons[3].click();

      expect(component.changeCurrency).toHaveBeenCalledWith('PLN');
      expect(component.activeCurrency).toBe('PLN');
    });


});

});
