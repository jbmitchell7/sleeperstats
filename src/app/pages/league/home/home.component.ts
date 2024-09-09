import { Component, inject, OnDestroy } from '@angular/core';
import { GraphComponent } from '../../../components/graph/graph.component';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectLeague, selectStandingsData } from 'src/app/store/selectors';
import { StandingsData } from 'src/app/data/interfaces/standingsData';
import { CommonModule } from '@angular/common';
import { SportState } from 'src/app/data/interfaces/sportstate';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GraphComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  readonly #store = inject(Store);
  #standingSub!: Subscription;
  #leagueSub!: Subscription;

  standingsData!: StandingsData[];
  sportState!: SportState;

  constructor() {
    this.#standingSub = this.#store
      .select(selectStandingsData)
      .subscribe(sd => this.standingsData = sd);

    this.#leagueSub = this.#store
      .select(selectLeague)
      .subscribe(l => this.sportState = l.sportState)
  }

  ngOnDestroy(): void {
    this.#standingSub.unsubscribe();
    this.#leagueSub.unsubscribe();
  }
}
