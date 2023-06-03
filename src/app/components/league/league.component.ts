import { Component, OnInit, inject } from '@angular/core';
import { Roster } from '../../interfaces/roster';
import { Store } from '@ngrx/store';
import { filter, take, tap } from 'rxjs';
import { selectApp } from 'src/app/store/selectors';
import { SubSink } from 'subsink';
import { LeagueUser } from 'src/app/interfaces/leagueuser';
import { League } from 'src/app/interfaces/league';

export interface LeaguePageData {
  username: string;
  points: number;
  max_points: number;
  points_against: number;
  wins: number;
  losses: number;
}

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss'],
})
export class LeagueComponent implements OnInit {
  isLoading = false;
  rosters: Roster[] = [];
  players: LeagueUser[] = [];
  league!: League;
  leaguePageData: LeaguePageData[] = [];
  #subs = new SubSink();
  readonly #store = inject(Store);

  ngOnInit(): void {
    const sub1 = this.#store
      .select(selectApp)
      .pipe(
        filter(
          (r) => !!r.rosterData.rosters.length && !!r.playersData.players.length
        ),
        take(1),
        tap((res) => {
          this.league = res.leagueData.league;
          this.rosters = res.rosterData.rosters;
          this.players = res.playersData.players;
          this.#setRosterData();
          console.log(this.leaguePageData);
        })
      )
      .subscribe();
    this.#subs.add(sub1);
  }

  #setRosterData(): void {
    this.isLoading = true;
    this.rosters.forEach((roster: Roster) => {
      const player = this.players.find((p) => p.user_id === roster.owner_id);
      if (!!player) {
        this.leaguePageData.push({
          username: player.display_name,
          points: roster.settings.fpts,
          max_points: roster.settings.ppts,
          points_against: roster.settings.fpts_against,
          wins: roster.settings.wins,
          losses: roster.settings.losses,
        });
      }
    });

    if (this.leaguePageData.length === this.rosters.length) {
      //sorts standings by wins then points
      this.leaguePageData.sort((a, b) =>
        a.wins < b.wins
          ? 1
          : a.wins == b.wins
          ? a.points < b.points
            ? 1
            : -1
          : -1
      );
      this.isLoading = false;
      //sets table and graph visibility
    }
  }
}
