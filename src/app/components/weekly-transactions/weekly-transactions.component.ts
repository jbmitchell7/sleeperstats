import { Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllPlayers, selectCurrentWeekTransactions } from '../../store/global.selectors';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SFF_Transaction } from '../../data/interfaces/Transactions';
import { combineLatest, distinctUntilChanged, filter, Subscription, tap } from 'rxjs';
import { getPlayersRequest } from '../../store/players/players.actions';
import { League } from '../../data/interfaces/league';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'ui-weekly-transactions',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule, DividerModule],
  templateUrl: './weekly-transactions.component.html',
  styleUrl: './weekly-transactions.component.scss'
})
export class WeeklyTransactionsComponent implements OnInit, OnDestroy {
  @Input({required: true}) league!: League;
  readonly #store = inject(Store);
  #sub!: Subscription;
  transactions: SFF_Transaction[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.#sub = combineLatest([
      this.#store.select(selectCurrentWeekTransactions),
      this.#store.select(selectAllPlayers)
    ])
      .pipe(
        filter(([transactions, players]) => !!transactions.length && !!players.ids.length),
        //necessary to prevent infinite refreshing
        distinctUntilChanged(([_, p],[_b, pb]) => p.ids.length === pb.ids.length),
        tap(([transactions]) => {
          const missingPlayers: any[] = [];
          transactions.forEach(t => {
            // check if no player data other than id
            if (t.player.player_id && !t.player.full_name) {
              missingPlayers.push(t.player.player_id);
            }
          });
          if (missingPlayers.length) {
            this.#store.dispatch(getPlayersRequest({sport: this.league.sport, ids: missingPlayers}));
          } else {
            this.transactions = transactions;
            this.isLoading = false;
          }
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }
}
