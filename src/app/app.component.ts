import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  constructor() {
    const parser = Bowser.getParser(navigator.userAgent);
    if (parser.getPlatformType() === 'mobile') {
      localStorage.setItem('MOBILE', 'true');
    } else {
      localStorage.setItem('MOBILE', 'false');
    }

    const id = localStorage.getItem('LEAGUE_ID');
    if (!!id) {
      this.#store.dispatch(leagueEntryRequest({ leagueId: id }));
    }
  }
}
