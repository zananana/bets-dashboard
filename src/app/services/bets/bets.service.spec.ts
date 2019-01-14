import { TestBed, async, inject } from '@angular/core/testing';
import { BetsService } from './bets.service';
import { HttpClientModule, HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BetsService', () => {

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
    const service: BetsService = TestBed.get(BetsService);
    expect(service).toBeTruthy();
  });


  it(`should get five bets`, async(inject([BetsService, HttpTestingController],
    (service: BetsService, backend: HttpTestingController) => {
      service.generateBets(5).subscribe();

      backend.expectOne((req: HttpRequest<any>) => {
        return req.url.endsWith('bets-generate?size=5') && req.method === 'GET';
      }, `GET bets-generate with size=5`);
  })));

  it(`should start pulling data`, async(inject([BetsService, HttpTestingController],
    (service: BetsService, backend: HttpTestingController) => {
      service.startLiveUpdate().subscribe();

      backend.expectOne((req: HttpRequest<any>) => {
        return req.url.endsWith('pulling/start?rate=0.3') && req.method === 'GET';
      }, `GET start pulling data`);
  })));

  it(`should stop pulling data`, async(inject([BetsService, HttpTestingController],
    (service: BetsService, backend: HttpTestingController) => {
      service.stopLiveUpdate().subscribe();

      backend.expectOne((req: HttpRequest<any>) => {
        return req.url.endsWith('pulling/stop') && req.method === 'GET';
      }, `GET stop pulling data`);
  })));






});
