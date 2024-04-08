import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest, filter, take, tap } from 'rxjs';
import { getPlayersRequest } from 'src/app/store/rosters/rosters.actions';
import { selectLeague, selectRosters } from 'src/app/store/selectors';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit, OnDestroy {
  #store = inject(Store);
  #sub!: Subscription;

  ngOnInit(): void {
    this.#sub = combineLatest([this.#store.select(selectRosters), this.#store.select(selectLeague)])
      .pipe(
        filter(([r,l]) => !!r.length && !!l.sport),
        take(1),
        tap(([r,l]) => {
          this.#store.dispatch(getPlayersRequest({sport: l.sport, managerId: r[0].owner_id, ids: r[0].players}));
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }
}
