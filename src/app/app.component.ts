import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearLeagueData } from './store/league/league.actions';
import { clearRosterData } from './store/rosters/rosters.actions';
import { clearPlayersData } from './store/players/players.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  resetLeague(): void {
    this.#store.dispatch(clearLeagueData());
    this.#store.dispatch(clearRosterData());
    this.#store.dispatch(clearPlayersData());
    this.#router.navigate(['welcome']);
  }
}
