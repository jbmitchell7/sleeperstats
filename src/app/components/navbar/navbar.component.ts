import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { MenuItem } from "primeng/api";
import { Store } from "@ngrx/store";
import { Subscription, filter, tap } from "rxjs";
import { League } from "src/app/data/interfaces/league";
import { leagueEntryRequest } from "src/app/store/global.actions";
import { clearLeagueData } from "src/app/store/league/league.actions";
import { clearManagersData } from "src/app/store/managers/managers.actions";
import { clearRosterData } from "src/app/store/rosters/rosters.actions";
import { selectLeague } from "src/app/store/selectors";
import { MenubarModule } from "primeng/menubar";
import { MENU_ROUTES } from "src/app/data/constants/navigation.constants";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule
  ],
  selector: 'ui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  readonly #store = inject(Store);
  readonly #sub: Subscription;
  readonly #router = inject(Router);
  
  menuItems!: MenuItem[];
  mobile = JSON.parse(localStorage.getItem('MOBILE') as string);

  constructor() {
    this.#sub = this.#store
      .select(selectLeague)
      .pipe(
        filter(l => !!l.sportState?.season),
        tap(l => {
          this.menuItems = [
            ...MENU_ROUTES,
            {
              label: 'Change League/Season',
              items: [
                {
                  label: 'Change League',
                  icon: 'fa-solid fa-arrows-rotate',
                  command: () => this.#resetLeague()
                },
                {
                  label: 'Previous Season',
                  icon: 'fa-solid fa-backward',
                  disabled: !l.previous_league_id,
                  command: () => this.#setLastSeason(l)
                },
                {
                  label: 'Next Season',
                  icon: 'fa-solid fa-forward',
                  disabled: l.sportState.season === l.season,
                  command: () => this.#setNextSeason(l)
                }
              ]
            },
          ]
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }

  #resetLeague(): void {
    this.#store.dispatch(clearLeagueData());
    this.#store.dispatch(clearRosterData());
    this.#store.dispatch(clearManagersData());
    localStorage.setItem('LEAGUE_ID', '');
    this.#router.navigate(['welcome']);
  }

  #setNextSeason(league: League): void {
    const nextYear = +league.season + 1;
    const nextSeasonId = localStorage.getItem(nextYear.toString());
    this.#store.dispatch(leagueEntryRequest({leagueId: nextSeasonId as string}));
  }

  #setLastSeason(league: League): void {
    localStorage.setItem(league.season, league.league_id);
    this.#store.dispatch(leagueEntryRequest({leagueId: league.previous_league_id}));
  }
}