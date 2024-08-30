import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { LeaguePageData } from 'src/app/interfaces/leaguePageData';
import { selectLeaguePageData } from 'src/app/store/selectors';

const SUBTITLE_TEXT =
  'Better teams are further right and more successful teams are further up \n Better managers have larger dots - dot size is proportional to the percentage of max points the team has scored';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit, OnDestroy {
  readonly #store = inject(Store);
  #sub!: Subscription;
  leaguePageData!: LeaguePageData[];

  ngOnInit(): void {
    this.#sub = this.#store
      .select(selectLeaguePageData)
      .pipe(
        tap((lp) => {
          this.leaguePageData = lp;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }
}
