import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { leagueEntryRequest } from '../../store/global.actions';
import { SleeperApiService } from '../../api/sleeper-api.service';
import { League } from '../../interfaces/league';
import { FormControl, Validators } from '@angular/forms';
import { catchError, take, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  leagueInputForm = new FormControl<string>('', [Validators.required, Validators.minLength(3)]);
  readonly #router = inject(Router);
  readonly #store = inject(Store);
  readonly #fetchApiDataService = inject(SleeperApiService);

  setLeagueId(): void {
    let id = this.leagueInputForm.value ?? '';
    this.#fetchApiDataService.sleeperGet(`/league/${id}`)
      .pipe(
        take(1),
        tap((res: League) => {
          if (
            res.status != 'in_season' &&
            res.status != 'post_season' &&
            res.status != 'complete'
          ) {
            id = res.previous_league_id;
          }
          this.#store.dispatch(leagueEntryRequest({ leagueId: id }));
          this.#router.navigate(['league']);
          localStorage.setItem('LEAGUE_ID', id);
        }),
        catchError((err) => throwError(() => err))
      )
      .subscribe();
  }
}
