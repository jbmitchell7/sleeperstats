import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest, filter, take, tap } from 'rxjs';
import { LeaguePageData } from 'src/app/interfaces/leaguePageData';
import { getPlayersRequest } from 'src/app/store/rosters/rosters.actions';
import { selectLeague, selectLeaguePageData } from 'src/app/store/selectors';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit, OnDestroy {
  readonly #store = inject(Store);
  #sub!: Subscription;

  selectedManager!: string | undefined;
  selectedTeam!: LeaguePageData | undefined;
  allTeams!: LeaguePageData[];
  dropdownOpen = false;
  sport!: string;
  isLoading = false;

  ngOnInit(): void {
    this.#sub = combineLatest([
      this.#store.select(selectLeaguePageData),
      this.#store.select(selectLeague)
    ])
      .pipe(
        filter(([lp,l]) => !!lp.length && !!l.sport),
        tap(([lp,l]) => {
          this.allTeams = lp.sort((a,b) => (
            a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
          ));
          this.sport = l.sport;
          if (this.selectedManager) {
            const team = lp.find(team => team.username === this.selectedManager);
            this.selectedTeam = team;
          }
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }

  selectTeam(index: number): void {
    const team = this.allTeams[index]
    this.selectedManager = team.username;
    this.dropdownOpen = false;
    if (!team.players) {
      this.isLoading = true;
      this.#store.dispatch(getPlayersRequest({
        sport: this.sport,
        managerId: team.owner_id,
        ids: team.playerIds
      }));
    } else {
      this.selectedTeam = team;
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
