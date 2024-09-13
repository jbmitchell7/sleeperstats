import { Component, inject, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from '../../data/interfaces/Transactions';
import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
import { selectAllPlayers } from 'src/app/store/selectors';
import { Player } from 'src/app/data/interfaces/roster';

@Component({
  selector: 'ui-weekly-transactions',
  standalone: true,
  imports: [],
  templateUrl: './weekly-transactions.component.html',
  styleUrl: './weekly-transactions.component.scss'
})
export class WeeklyTransactionsComponent implements OnChanges {
  @Input({required: true}) transactions!: Transaction[];
  @Input() transactionsLoading = true;
  readonly #store = inject(Store);
  #playersInTransactions!: Player[];

  ngOnChanges(): void {
    if (!this.transactionsLoading) {
      const transactionIds: string[] = [];
      this.transactions.forEach(t => {
        if (t.adds) {
          this.#getTransactionPlayerIds(t.adds, transactionIds);
        }
        if (t.drops) {
          this.#getTransactionPlayerIds(t.drops, transactionIds);
        }
      });
      this.#store.select(selectAllPlayers)
        .subscribe(players => {
          this.#playersInTransactions = players.filter(p => transactionIds.includes(p.player_id));
        });
    }
  }

  #getTransactionPlayerIds(item: any, list: string[]): void {
    Object.keys(item).forEach(add => list.push(add));
  }
}
