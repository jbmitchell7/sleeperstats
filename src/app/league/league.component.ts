import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

  league = localStorage.getItem('leagueId');
  users: any = [];
  rosters: any = [];
  chartData: any = [];

  //chart setup
  view: any[] = [700, 400];
  showXAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = "Hi";
  xAxisLabel = 'Points Scored';
  yAxisLabel = 'Potential Points';
  showGridLines = true;
  autoScale = true;
  minRadius = 1;
  maxRadius = 1;

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getRosters();
  }

  //gets user display names

  getUser = (userid: string): void => {
    this.fetchApiData.sleeperGet(`/user/${userid}`)
      .subscribe({
        next: res => {
          this.users.push(res);
        },
        error: () => {
          this.snackBar.open('Could not get league data. Come back again later', 'OK', {
            duration: 1000
          });
          this.router.navigate(['welcome']);
        },
      })
  }

  //roster data is what holds a team's total points

  getRosters = (): void => {
    this.fetchApiData.sleeperGet(`/league/${this.league}/rosters`)
      .subscribe({
        next: res => {
          this.rosters = res;
          this.rosters.forEach((element: any) => {
            this.getUser(element.owner_id);
            this.chartData.push(
              {
                "name": element.owner_id,
                "series": [
                  {
                    "name": element.owner_id,
                    "x": element.settings.fpts,
                    "y": element.settings.ppts,
                    "r": 1
                  }
                ]
              }
            );
          });
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

}
