import { TestBed, inject } from '@angular/core/testing';

import { CurrencyService } from './currency.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CurrencyService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: []
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', () => {
    const service: CurrencyService = TestBed.get(CurrencyService);
    expect(service).toBeTruthy();
  });
});
