import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SleeperApiService } from '../api/sleeper-api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { Roster } from '../data/interfaces/roster';
import { getLeagueSuccess, getLeagueFailure } from './league/league.actions';
import {
  getRostersSuccess,
  getRostersFailure,
  getPlayersRequest,
  getPlayersSuccess,
  getPlayersFailure,
} from './rosters/rosters.actions';
import { getSportStateFailure, getSportStateSuccess, leagueEntryRequest } from './global.actions';
import { getManagersSuccess } from './managers/managers.actions';
import { LeagueUser } from '../data/interfaces/leagueuser';
import { League } from '../data/interfaces/league';
import { FantasyFocusApiService } from '../api/fantasy-focus-api.service';
import { SportState } from '../data/interfaces/sportstate';
import { Router } from '@angular/router';

@Injectable()
export class GlobalEffects {
  readonly #actions$ = inject(Actions);
  readonly #sleeperApi = inject(SleeperApiService);
  readonly #router = inject(Router);
  readonly #fantasyFocusApi = inject(FantasyFocusApiService);

  getLeague$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(leagueEntryRequest),
      switchMap((props) =>
        this.#sleeperApi.getLeague(props.leagueId).pipe(
          map((res: League) => getLeagueSuccess({ league: res })),
          catchError(() =>
            of(getLeagueFailure({ error: 'error getting league data' }))
          )
        )
      )
    )
  );

  getSportState$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getLeagueSuccess),
      switchMap(props =>
        this.#sleeperApi.getSportState(props.league.sport).pipe(
          map((sport: SportState) => {
            this.#router.navigate(['league'])
            return getSportStateSuccess({sport})
          }),
          catchError((error) => of(getSportStateFailure({error})))
        )
      )
    )
  );

  getRosters$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(leagueEntryRequest),
      switchMap((props) =>
        this.#sleeperApi
          .getRosters(props.leagueId)
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
          .getManagers(props.leagueId)
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
