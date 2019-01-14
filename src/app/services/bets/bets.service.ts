import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBet } from 'src/app/interfaces/IBet';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  constructor(private http: HttpClient) { }

  private socket;

  private url = 'http://localhost:3000/';
  // private url = 'https://betsys-fe-assessment.herokuapp.com/';

  public generateBets(size: number): Observable<any> {
      const url = this.url + 'bets-generate?size=' + size;
      return this.http.get<IBet[]>(url);
  }

  startLiveUpdate() {
        const url = this.url + 'pulling/start?rate=0.3'; // live update every ~4s
        return this.http.get(url);
  }

  stopLiveUpdate() {
        const url = this.url + 'pulling/stop';
        return this.http.get(url);
  }

  getUpdatedBets() {
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('bet-updated', (data: IBet[]) => {
        observer.next(data);
      });
    });
  }

}
