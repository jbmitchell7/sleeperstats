import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { clearLeagueData } from "src/app/store/league/league.actions";
import { clearManagersData } from "src/app/store/managers/managers.actions";
import { clearRosterData } from "src/app/store/rosters/rosters.actions";
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from "primeng/button";
import { MenuItem } from "primeng/api";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, TabMenuModule, ButtonModule],
  selector: 'ui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      routerLink: ['home']
    },
    {
      label: 'Standings',
      routerLink: ['standings']
    },
  ]

  resetLeague(): void {
    this.#store.dispatch(clearLeagueData());
    this.#store.dispatch(clearRosterData());
    this.#store.dispatch(clearManagersData());
    localStorage.setItem('LEAGUE_ID', '');
    this.#router.navigate(['welcome']);
  }
}