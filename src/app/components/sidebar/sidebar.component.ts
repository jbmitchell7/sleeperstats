import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearLeagueData } from 'src/app/store/league/league.actions';
import { clearPlayersData } from 'src/app/store/players/players.actions';
import { clearRosterData } from 'src/app/store/rosters/rosters.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  readonly #store = inject(Store);
  readonly #router = inject(Router);
  expanded = false;

  resetLeague(): void {
    this.#store.dispatch(clearLeagueData());
    this.#store.dispatch(clearRosterData());
    this.#store.dispatch(clearPlayersData());
    localStorage.setItem('LEAGUE_ID', '');
    this.#router.navigate(['welcome']);
  }

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }
}
