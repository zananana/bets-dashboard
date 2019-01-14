import { Component, OnInit, OnDestroy } from '@angular/core';
import { BetsService } from 'src/app/services/bets/bets.service';
import { IBet } from 'src/app/interfaces/IBet';
import * as _ from 'lodash';


@Component({
  selector: 'app-bets-table',
  templateUrl: './bets-table.component.html',
  styleUrls: ['./bets-table.component.scss']
})
export class BetsTableComponent implements OnInit, OnDestroy {

  constructor(
    private service: BetsService
    ) { }

  public currency = 'USD';

  public bets: IBet[] = [];
  public betsStream = [];
  public connection;
  public pulling;

  public liveUpdates = false;

  public handleCurrencyStateChanged(curr: string): void {
    this.currency = curr;
  }

  stopLiveUpdates() {
    this.liveUpdates = false;
    this.service.stopLiveUpdate().subscribe((res) => {
      this.connection.unsubscribe();
      this.pulling.unsubscribe();
    });
  }

  startLiveUpdates() {
    this.liveUpdates = true;
    this.pulling = this.service.startLiveUpdate().subscribe(() => {
      this.connection = this.service.getUpdatedBets().subscribe((data: IBet[]) => {
      this.betsStream = [];
      /*
      ** Only unique id as from the service we're getting
      ** a lot of updates for one iteam.
      ** I decided to just determine unique IDs here
      ** instead of looking for the last record of given id - probably something that could be improved
      ** if records had timestamps it would be more relable
      */
      this.betsStream = _.uniqBy(data, 'id');

        this.betsStream.map( bet => {

          const index = _.findIndex(this.bets, ['id', bet.id]);

          const drawOdds = this.bets[index].draw > bet.draw ? true : false;
          const teamOdds = [
            {
              name: this.bets[index].teams[0].name,
              win: bet.teams[0].win,
              oddsIncreased: this.bets[index].teams[0].win > bet.teams[0].win ? true : false },
            {
              name: this.bets[index].teams[1].name,
              win: bet.teams[1].win,
              oddsIncreased: this.bets[index].teams[1].win > bet.teams[1].win ? true : false }
          ];

          const newItem = Object.assign({}, this.bets[index], {teams: teamOdds}, { oddsIncreased: drawOdds} );

          this.bets[index] = newItem;

        });
      });
    });
  }

  ngOnInit() {
    this.service.generateBets(5).subscribe(data => {
      this.bets = data.bets;
      // this.startLiveUpdates();
    });

  }


  ngOnDestroy() {
    this.stopLiveUpdates();
  }

}
