import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Roster } from '../data/roster';
import { User } from '../data/user';

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
  }

  league = localStorage.getItem('leagueId');
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
          this.setLeagueData();
        },
        error: () => {
          this.snackBar.open('Could not get league data. Come back again later', 'OK', {
            duration: 1000
          });
          localStorage.setItem('leagueId', "");
          this.router.navigate(['welcome']);
        },
      })
  }

  setLeagueData = (): void => {
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
            },
            error: () => {
              console.log('error filling standings data');
            },
          })
      })
      this.loadData = true;
    }
  }
}
