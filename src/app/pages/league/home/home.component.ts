import { Component, inject, OnDestroy } from '@angular/core';
import { GraphComponent } from '../../../components/graph/graph.component';
import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
import { selectApp, selectStandingsData } from '../../../store/selectors';
import { StandingsData } from '../../../data/interfaces/standingsData';
import { CommonModule } from '@angular/common';
import { SportState } from '../../../data/interfaces/sportstate';
import { CardModule } from 'primeng/card';
import { League } from '../../../data/interfaces/league';
import { Transaction } from '../../../data/interfaces/Transactions';
import { getTransactionsRequest } from '../../../store/transactions/transactions.actions';
import { TransactionItemComponent } from "../../../components/transaction-item/transaction-item.component";
import { WeeklyTransactionsComponent } from "../../../components/weekly-transactions/weekly-transactions.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GraphComponent, CardModule, TransactionItemComponent, WeeklyTransactionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  readonly #store = inject(Store);
  #standingSub!: Subscription;
  #leagueSub!: Subscription;

  standingsData!: StandingsData[];
  sportState!: SportState;
  league!: League;
  weekTitle!: string;
  weekNumber!: number;
  transactions!: Transaction[];
  seasonComplete = false;

  constructor() {
    this.#standingSub = this.#store
      .select(selectStandingsData)
      .subscribe(sd => this.standingsData = sd);

    this.#leagueSub = this.#store
      .select(selectApp)
      .pipe(
        filter(app => !!app.leagueData.league?.sportState?.season),
        tap(({leagueData, transactionsData}) => {
          this.league = leagueData.league;
          this.sportState = this.league.sportState;
          this.seasonComplete = this.league.status === 'complete';
          this.weekNumber = this.seasonComplete ? 18 : this.league.sportState.week;
          this.weekTitle = `${this.league.sport.toUpperCase()} ${this.league.season} - Week ${this.weekNumber}`;
          if (!this.seasonComplete) {
            if (transactionsData.transactions[this.weekNumber]) {
              this.transactions = transactionsData.transactions[this.weekNumber];
            } else {
              this.#store.dispatch(getTransactionsRequest({
                leagueId: this.league.league_id,
                week: this.weekNumber
              }));
            }
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#standingSub.unsubscribe();
    this.#leagueSub.unsubscribe();
  }
}
