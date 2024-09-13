import { Component, Input } from '@angular/core';
import { Transaction } from '../../data/interfaces/Transactions';

@Component({
  selector: 'ui-transaction-item',
  standalone: true,
  imports: [],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss'
})
export class TransactionItemComponent {
  @Input({required: true}) transaction!: Transaction;
}
