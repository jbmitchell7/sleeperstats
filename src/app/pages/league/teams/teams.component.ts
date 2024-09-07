import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest, filter, tap } from 'rxjs';
import { StandingsData } from 'src/app/data/interfaces/standingsData';
import { getPlayersRequest } from 'src/app/store/rosters/rosters.actions';
import { selectLeague, selectStandingsData, selectRosters } from 'src/app/store/selectors';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class TeamsComponent implements OnInit, OnDestroy {
  readonly #store = inject(Store);
  #sub!: Subscription;

  selectedManager!: string | undefined;
  selectedTeam!: StandingsData | undefined;
  allTeams!: StandingsData[];
  dropdownOpen = false;
  sport!: string;
  isLoading = false;

  ngOnInit(): void {
    this.#sub = combineLatest([
      this.#store.select(selectStandingsData),
      this.#store.select(selectLeague),
      this.#store.select(selectRosters)
    ])
      .pipe(
        filter(([lp,l]) => !!lp.length && !!l.sport),
        tap(([lp,l, ros]) => {
          this.allTeams = lp.sort((a,b) => (
            a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
          ));
          this.sport = l.sport;
          if (this.selectedManager) {
            const team = lp.find(team => team.username === this.selectedManager);
            this.selectedTeam = team;
          }
          this.isLoading = ros.isLoading;
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
