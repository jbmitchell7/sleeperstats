import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { StandingsData } from '../../../data/interfaces/standingsData';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest, filter, tap } from 'rxjs';
import { selectLeague, selectStandingsData } from '../../../store/selectors';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

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
    field: 'streak',
    header: 'Streak'
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
    imports: [CommonModule, TableModule, TagModule],
})
export class StandingsComponent implements OnInit, OnDestroy {
  readonly #store = inject(Store);
  #sub!: Subscription;
  pageTitle!: string;
  standingsData!: StandingsData[];
  columnDefs = STANDINGS_COLUMNS;
  leagueYear!: string;
  leagueName!: string;
  dataLoaded: boolean = false;
  maxGridWidth = 690;
  seasonStarted = false;
  mobileDevice = JSON.parse(localStorage.getItem('mobile') as string);
  gridStyle = `p-datatable-striped ${this.mobileDevice ? 'p-datatable-sm' : ''}`

  ngOnInit(): void {
    this.#sub = combineLatest([
      this.#store.select(selectStandingsData),
      this.#store.select(selectLeague),
    ])
      .pipe(
        filter(([sd, l]) => !!sd.length && !!l.name),
        tap(([sd, l]) => {
          this.standingsData = sd;
          this.seasonStarted = sd[0].wins !== 0 || sd[0].losses !== 0;
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
