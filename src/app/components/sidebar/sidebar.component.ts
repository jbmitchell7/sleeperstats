import { Component, ElementRef, Host, HostListener, OnDestroy, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { toggleSidebarExpanded } from '../../store/global.actions';
import { clearLeagueData } from '../../store/league/league.actions';
import { clearPlayersData } from '../../store/players/players.actions';
import { clearRosterData } from '../../store/rosters/rosters.actions';
import { selectSharedData } from '../../store/selectors';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnDestroy {
  readonly #store = inject(Store);
  readonly #router = inject(Router);
  readonly #ref = inject(ElementRef);
  #sub!: Subscription;
  expanded = false;
  mobile = false;
  dropdownActive = false;

  constructor() {
    this.#checkMobileScreen();
    this.#sub = this.#store
      .select(selectSharedData)
      .pipe(tap((state) => (this.expanded = state.sidebarExpanded)))
      .subscribe();
  }

  @HostListener('window:resize')
  @HostListener('window:orientation')
  recheck(): void {
    this.#checkMobileScreen();
  }

  @HostListener('document:click', ['$event.target'])
  checkClickLocation(target: HTMLElement): void {
    if (this.mobile && !this.#ref.nativeElement.contains(target) && this.dropdownActive) {
      this.dropdownActive = false;
    }
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }

  resetLeague(): void {
    this.#store.dispatch(clearLeagueData());
    this.#store.dispatch(clearRosterData());
    this.#store.dispatch(clearPlayersData());
    localStorage.setItem('LEAGUE_ID', '');
    this.#router.navigate(['welcome']);
  }

  toggleExpanded(): void {
    this.#store.dispatch(toggleSidebarExpanded());
  }

  toggleDropdown(): void {
    this.dropdownActive = !this.dropdownActive;
  }

  #checkMobileScreen(): void {
    if (window.screen.width <= 500) {
      this.mobile = true;
    }
  }
}
