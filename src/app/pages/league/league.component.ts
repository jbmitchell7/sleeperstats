import { Component, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { selectSharedData } from 'src/app/store/selectors';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss'],
})
export class LeagueComponent implements OnDestroy {
  readonly #store = inject(Store);
  readonly #subs = new SubSink();
  sidebarExpanded = false;

  constructor() {
    const sub = this.#store
      .select(selectSharedData)
      .pipe(tap((s) => (this.sidebarExpanded = s.sidebarExpanded)))
      .subscribe();

    this.#subs.add(sub);
  }
  ngOnDestroy(): void {
    this.#subs.unsubscribe();
  }
}
