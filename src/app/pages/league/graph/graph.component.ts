import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { StandingsData } from 'src/app/interfaces/standingsData';
import { selectStandingsData } from 'src/app/store/selectors';
import { CommonModule } from '@angular/common';

const SUBTITLE_TEXT =
  'Better teams are further right and more successful teams are further up \n Better managers have larger dots - dot size is proportional to the percentage of max points the team has scored';

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class GraphComponent implements OnInit, OnDestroy {
  readonly #store = inject(Store);
  #sub!: Subscription;
  standingsData!: StandingsData[];

  ngOnInit(): void {
    this.#sub = this.#store
      .select(selectStandingsData)
      .pipe(
        tap((lp) => {
          this.standingsData = lp;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }
}
