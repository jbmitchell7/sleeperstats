import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { leagueEntryRequest } from './store/global.actions';
import Bowser from "bowser";

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
    const parser = Bowser.getParser(navigator.userAgent);
    if (parser.getPlatformType() === 'mobile') {
      localStorage.setItem('mobile', 'true');
    } else {
      localStorage.setItem('mobile', 'false');
    }

    const id = localStorage.getItem('LEAGUE_ID');
    if (!!id) {
      this.#store.dispatch(leagueEntryRequest({ leagueId: id }));
      this.#router.navigate(['league']);
    } else {
      this.#router.navigate(['welcome']);
    }
  }
}
