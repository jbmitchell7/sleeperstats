import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../data/interfaces/Transactions';

@Component({
  selector: 'ui-weekly-transactions',
  standalone: true,
  imports: [],
  templateUrl: './weekly-transactions.component.html',
  styleUrl: './weekly-transactions.component.scss'
})
export class WeeklyTransactionsComponent implements OnInit {
  @Input({required: true}) transactions!: Transaction[];

  ngOnInit(): void {
    
  }
}
