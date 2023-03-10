import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Roster } from '../interfaces/roster';
import { User } from '../interfaces/user';
import { League } from '../interfaces/league';

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
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getRosters();
    this.getLeagueInfo();
  }

  league = localStorage.getItem('leagueId');
  avatars: string[] = [];
  rosters: Roster[] = [];
  loadData: boolean = false;
  loadRosters: boolean = false;
  leaguePageData: LeaguePageData[] = [];

  getRosters = (): void => {
    this.fetchApiData.sleeperGet(`/league/${this.league}/rosters`)
      .subscribe({
        next: res => {
          this.rosters = res;
          this.loadRosters = true;
          this.setRosterData();
        },
        error: () => {
          this.snackBar.open('Could not get roster data. Come back again later', 'OK', {
            duration: 1000
          });
          localStorage.setItem('leagueId', "");
          this.router.navigate(['welcome']);
        },
      })
  }

  setRosterData = (): void => {
    if (this.loadRosters) {
      this.rosters.forEach((roster: Roster) => {
        let id: string = roster.owner_id;
        let name: string;
        this.fetchApiData.sleeperGet(`/user/${id}`)
          .subscribe({
            next: (res: User) => {
              name = res.display_name;
              this.leaguePageData.push(
                {
                  username: name,
                  points: roster.settings.fpts,
                  max_points: roster.settings.ppts,
                  points_against: roster.settings.fpts_against,
                  wins: roster.settings.wins,
                  losses: roster.settings.losses
                }
              );
              //checks that all rosters have been pushed to leaguePageData
              if (this.leaguePageData.length == this.rosters.length) {
                //sorts standings by wins then points
                this.leaguePageData.sort(
                  (a, b) => (a.wins < b.wins) ? 1 : (a.wins == b.wins) ?
                    ((a.points < b.points) ? 1 : -1) : -1
                )
                //sets table and graph visibility
                this.loadData = true;
              }
            },
            error: () => {
              console.log('error filling standings data');
            },
          })
      })
    }
  }

  getLeagueInfo = (): void => {
    const id = localStorage.getItem('leagueId');
    this.fetchApiData.sleeperGet(`/league/${id}`)
      .subscribe({
        next: (res: League) => {
          localStorage.setItem('leagueYear', res.season);
        },
        error: () => {
          this.snackBar.open('Could not get league data.', 'OK', {
            duration: 1000
          });
        }
      })
  }
}
