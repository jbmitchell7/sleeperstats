import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LeaguePageData } from '../../../interfaces/leaguePageData';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest, filter, tap } from 'rxjs';
import { selectLeague, selectLeaguePageData } from '../../../store/selectors';
import { CommonModule } from '@angular/common';
import { LeaguePageHeaderComponent } from '../../../components/league-page-header/league-page-header.component';

@Component({
    selector: 'app-standings',
    templateUrl: './standings.component.html',
    styleUrls: ['./standings.component.scss'],
    standalone: true,
    imports: [CommonModule, LeaguePageHeaderComponent],
})
export class StandingsComponent implements OnInit, OnDestroy {
  readonly #store = inject(Store);
  #sub!: Subscription;
  pageTitle!: string;
  leaguePageData!: LeaguePageData[];
  leagueYear!: string;
  leagueName!: string;
  dataLoaded: boolean = false;
  maxGridWidth = 690

  ngOnInit(): void {
    this.#sub = combineLatest([
      this.#store.select(selectLeaguePageData),
      this.#store.select(selectLeague),
    ])
      .pipe(
        filter(([lp, l]) => !!lp.length && !!l.name),
        tap(([lp, l]) => {
          this.leaguePageData = lp;
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
