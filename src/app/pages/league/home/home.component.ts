import { Component, inject, OnDestroy } from '@angular/core';
import { GraphComponent } from '../../../components/graph/graph.component';
import { Store } from '@ngrx/store';
import { filter, map, Subscription, switchMap, tap } from 'rxjs';
import { selectLeague, selectStandingsData } from 'src/app/store/selectors';
import { StandingsData } from 'src/app/data/interfaces/standingsData';
import { CommonModule } from '@angular/common';
import { SportState } from 'src/app/data/interfaces/sportstate';
import { CardModule } from 'primeng/card';
import { League } from 'src/app/data/interfaces/league';
import { SleeperApiService } from 'src/app/api/sleeper-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GraphComponent, CardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  readonly #store = inject(Store);
  #standingSub!: Subscription;
  #leagueSub!: Subscription;
  #sleeperApi = inject(SleeperApiService);

  standingsData!: StandingsData[];
  sportState!: SportState;
  league!: League;
  weekTitle!: string;
  transactions!: any[];
  seasonComplete = false;

  constructor() {
    this.#standingSub = this.#store
      .select(selectStandingsData)
      .subscribe(sd => this.standingsData = sd);

    this.#leagueSub = this.#store
      .select(selectLeague)
      .pipe(
        filter(league => !!league?.sportState?.season),
        map(l => {
          this.sportState = l.sportState;
          this.league = l;
          this.seasonComplete = this.league.status === 'complete';
          const weekNumber = this.seasonComplete ? 18 : l.sportState.week;
          this.weekTitle = `${l.sport.toUpperCase()} ${l.season} - Week ${weekNumber}`;
          return {
            weekNumber,
            leagueId: l.league_id
          };
        }),
        filter(() => !this.seasonComplete),
        switchMap(result => this.#sleeperApi
          .getTransactions(result.leagueId, result.weekNumber)
          .pipe(
            tap(res => {
              this.transactions = res;
            })
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#standingSub.unsubscribe();
    this.#leagueSub.unsubscribe();
  }
}
