import { Component, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { selectSharedData } from '../../store/selectors';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss'],
})
export class LeagueComponent implements OnDestroy {
  readonly #store = inject(Store);
  #sub!: Subscription;
  sidebarExpanded = false;

  constructor() {
    this.#sub = this.#store
      .select(selectSharedData)
      .pipe(tap(s => this.sidebarExpanded = s.sidebarExpanded))
      .subscribe();
  }
  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }
}
