import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FetchApiDataService } from "src/app/api/fetch-api-data.service";
import { getLeagueFailure, getLeagueRequest, getLeagueSuccess } from "./league.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class LeagueEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly fetchApiDataService: FetchApiDataService
  ) {}

  getLeague$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLeagueRequest),
      switchMap((id) => this.fetchApiDataService.sleeperGet(`league/${id.leagueId}`).pipe(
        map(res => getLeagueSuccess({league: res})),
        catchError(() => of(getLeagueFailure({error: 'error getting league data'})))
      ))
    )
  )
}