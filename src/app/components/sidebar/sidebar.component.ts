import { Component, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { toggleSidebarExpanded } from '../../store/global.actions';
import { clearLeagueData } from '../../store/league/league.actions';
import { clearPlayersData } from '../../store/players/players.actions';
import { clearRosterData } from '../../store/rosters/rosters.actions';
import { selectSharedData } from '../../store/selectors';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnDestroy {
  readonly #store = inject(Store);
  readonly #router = inject(Router);
  readonly #subs = new SubSink();
  expanded = false;

  constructor() {
    const sub = this.#store
      .select(selectSharedData)
      .pipe(tap((state) => (this.expanded = state.sidebarExpanded)))
      .subscribe();

    this.#subs.add(sub);
  }

  ngOnDestroy(): void {
    this.#subs.unsubscribe();
  }

  resetLeague(): void {
    this.#store.dispatch(clearLeagueData());
    this.#store.dispatch(clearRosterData());
    this.#store.dispatch(clearPlayersData());
    localStorage.setItem('LEAGUE_ID', '');
    this.#router.navigate(['welcome']);
  }

  toggleExpanded(): void {
    this.#store.dispatch(toggleSidebarExpanded());
  }
}
