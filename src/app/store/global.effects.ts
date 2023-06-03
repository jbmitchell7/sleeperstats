import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FetchApiDataService } from 'src/app/api/fetch-api-data.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { Roster } from 'src/app/interfaces/roster';
import { getLeagueSuccess, getLeagueFailure } from './league/league.actions';
import {
  getRostersSuccess,
  getRostersFailure,
} from './rosters/rosters.actions';
import { leagueEntryRequest } from './global.actions';
import { getPlayersSuccess } from './players/players.actions';
import { LeagueUser } from '../interfaces/leagueuser';
import { League } from '../interfaces/league';

@Injectable()
export class GlobalEffects {
  readonly #actions$ = inject(Actions);
  readonly #fetchApiDataService = inject(FetchApiDataService);

  getLeague$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(leagueEntryRequest),
      switchMap((props) =>
        this.#fetchApiDataService.sleeperGet(`league/${props.leagueId}`).pipe(
          map((res: League) => getLeagueSuccess({ league: res })),
          catchError(() =>
            of(getLeagueFailure({ error: 'error getting league data' }))
          )
        )
      )
    )
  );

  getRosters$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(leagueEntryRequest),
      switchMap((props) =>
        this.#fetchApiDataService
          .sleeperGet(`/league/${props.leagueId}/rosters`)
          .pipe(
            map((res: Roster[]) => getRostersSuccess({ rosters: res })),
            catchError(() =>
              of(getRostersFailure({ error: 'error getting roster data' }))
            )
          )
      )
    )
  );

  getPlayers$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(leagueEntryRequest),
      switchMap((props) =>
        this.#fetchApiDataService
          .sleeperGet(`/league/${props.leagueId}/users`)
          .pipe(
            map((res: LeagueUser[]) => getPlayersSuccess({ players: res })),
            catchError(() =>
              of(getRostersFailure({ error: 'error getting roster data' }))
            )
          )
      )
    )
  );
}
