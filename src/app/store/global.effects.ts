import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SleeperApiService } from '../api/sleeper-api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { Roster } from '../interfaces/roster';
import { getLeagueSuccess, getLeagueFailure } from './league/league.actions';
import {
  getRostersSuccess,
  getRostersFailure,
  getPlayersRequest,
  getPlayersSuccess,
  getPlayersFailure,
} from './rosters/rosters.actions';
import { leagueEntryRequest } from './global.actions';
import { getManagersSuccess } from './managers/managers.actions';
import { LeagueUser } from '../interfaces/leagueuser';
import { League } from '../interfaces/league';
import { FantasyFocusApiService } from '../api/fantasy-focus-api.service';
import { Router } from '@angular/router';

@Injectable()
export class GlobalEffects {
  readonly #actions$ = inject(Actions);
  readonly #router = inject(Router);
  readonly #sleeperApi = inject(SleeperApiService);
  readonly #fantasyFocusApi = inject(FantasyFocusApiService);

  getLeague$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(leagueEntryRequest),
      switchMap((props) =>
        this.#sleeperApi.sleeperGet(`league/${props.leagueId}`).pipe(
          map((res: League) => {
            const currentYear: string = new Date().getFullYear().toString();
            if (res.season !== currentYear && res.status === 'complete') {
              this.#router.navigate(['welcome']);
              return getLeagueFailure({ error: 'new league season may be available' });
            }
            return getLeagueSuccess({ league: res })
          }),
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
        this.#sleeperApi
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

  getManagers$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(leagueEntryRequest),
      switchMap((props) =>
        this.#sleeperApi
          .sleeperGet(`/league/${props.leagueId}/users`)
          .pipe(
            map((res: LeagueUser[]) => getManagersSuccess({ players: res })),
            catchError(() =>
              of(getRostersFailure({ error: 'error getting roster data' }))
            )
          )
      )
    )
  );

  getPlayersData$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getPlayersRequest),
      switchMap((props) =>
        this.#fantasyFocusApi.fantasyFocusGet(`players/${props.sport}`, props.ids)
          .pipe(
            map((res: any) => getPlayersSuccess({ id: props.managerId, players: res })),
            catchError(() =>
              of(getPlayersFailure({ error: 'error getting roster data' }))
            )
          )
      )
    )
  );
}
