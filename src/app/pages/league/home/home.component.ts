import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GraphComponent } from '../../../components/graph/graph.component';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { selectStandingsData } from 'src/app/store/selectors';
import { StandingsData } from 'src/app/interfaces/standingsData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GraphComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly #store = inject(Store);
  #sub!: Subscription;
  standingsData!: StandingsData[];

  ngOnInit(): void {
    this.#sub = this.#store
      .select(selectStandingsData)
      .subscribe(sd => this.standingsData = sd);
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }
}
