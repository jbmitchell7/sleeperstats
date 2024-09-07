import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { clearLeagueData } from 'src/app/store/league/league.actions';
import { clearManagersData } from 'src/app/store/managers/managers.actions';
import { clearRosterData } from 'src/app/store/rosters/rosters.actions';

@Component({
  selector: 'ui-reset-league-btn',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './reset-league-btn.component.html',
  styleUrl: './reset-league-btn.component.scss'
})
export class ResetLeagueBtnComponent {
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  resetLeague(): void {
    this.#store.dispatch(clearLeagueData());
    this.#store.dispatch(clearRosterData());
    this.#store.dispatch(clearManagersData());
    localStorage.setItem('LEAGUE_ID', '');
    this.#router.navigate(['welcome']);
  }
}
