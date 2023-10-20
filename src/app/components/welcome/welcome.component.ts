import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { leagueEntryRequest } from 'src/app/store/global.actions';
import { FetchApiDataService } from 'src/app/api/fetch-api-data.service';
import { League } from 'src/app/interfaces/league';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  leagueIdInput = '';
  readonly #router = inject(Router);
  readonly #store = inject(Store);
  readonly #fetchApiDataService = inject(FetchApiDataService);

  setLeagueId(): void {
    let id = this.leagueIdInput;
    this.#fetchApiDataService.sleeperGet(`/league/${id}`).subscribe({
      next: (res: League) => {
        if (
          res.status != 'in_season' &&
          res.status != 'post_season' &&
          res.status != 'complete'
        ) {
          id = res.previous_league_id;
        }
        this.#store.dispatch(leagueEntryRequest({ leagueId: id }));
        this.#router.navigate(['league-dashboard']);
        localStorage.setItem('LEAGUE_ID', id);
      },
      error: () => {
        id = '';
        console.log('unable to get league data');
      },
    });
  }
}
