import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { leagueEntryRequest } from './store/global.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent {
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  constructor() {
    const id = localStorage.getItem('LEAGUE_ID');
    if (!!id) {
      this.#store.dispatch(leagueEntryRequest({ leagueId: id }));
      this.#router.navigate(['league']);
    } else {
      this.#router.navigate(['welcome']);
    }
  }
}
