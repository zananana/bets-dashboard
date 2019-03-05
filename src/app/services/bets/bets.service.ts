import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBet, IGenerateBetResponse } from 'src/app/interfaces/IBet';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  constructor(private http: HttpClient) { }

  private socket;
  private url = environment.apiUrl;

  public generateBets(size: number): Observable<IGenerateBetResponse> {
      const url = this.url + 'bets-generate?size=' + size;
      return this.http.get<IGenerateBetResponse>(url);
  }

  startLiveUpdate(): Observable<any> {
        const url = this.url + 'pulling/start?rate=0.3'; // live update every ~4s
        return this.http.get(url);
  }

  stopLiveUpdate(): Observable<any> {
        const url = this.url + 'pulling/stop';
        return this.http.get(url);
  }

  getUpdatedBets(): Observable<any> {
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('bet-updated', (data: IBet[]) => {
        observer.next(data);
      });
    });
  }

}
