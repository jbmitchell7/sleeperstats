import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LeaguePageData } from '../../../interfaces/leaguePageData';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest, filter, tap } from 'rxjs';
import { selectLeague, selectLeaguePageData } from '../../../store/selectors';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

interface Column {
  field: string;
  header: string;
}

const STANDINGS_COLUMNS: Column[] = [
  {
    field: 'username',
    header: 'Manager'
  },
  {
    field: 'wins',
    header: 'Wins'
  },
  {
    field: 'losses',
    header: 'Losses'
  },
  {
    field: 'maxPoints',
    header: 'Max Points'
  },
  {
    field: 'points',
    header: 'PF'
  },
  {
    field: 'pointsAgainst',
    header: 'PA'
  }
];

@Component({
    selector: 'app-standings',
    templateUrl: './standings.component.html',
    standalone: true,
    imports: [CommonModule, TableModule],
})
export class StandingsComponent implements OnInit, OnDestroy {
  readonly #store = inject(Store);
  #sub!: Subscription;
  pageTitle!: string;
  leaguePageData!: LeaguePageData[];
  columnDefs = STANDINGS_COLUMNS;
  leagueYear!: string;
  leagueName!: string;
  dataLoaded: boolean = false;
  maxGridWidth = 690;
  seasonStarted = false;

  ngOnInit(): void {
    this.#sub = combineLatest([
      this.#store.select(selectLeaguePageData),
      this.#store.select(selectLeague),
    ])
      .pipe(
        filter(([lp, l]) => !!lp.length && !!l.name),
        tap(([lp, l]) => {
          this.leaguePageData = lp;
          this.seasonStarted = lp[0].wins !== 0 || lp[0].losses !== 0;
          this.leagueName = l.name;
          this.leagueYear = l.season;
          this.pageTitle = `${this.leagueName} Standings ${this.leagueYear}`;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }
}
