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
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getRosters();
  }

  league = localStorage.getItem('leagueId');
  rosters: any = [];
  users: any = [];
  usernames: any = [];
  loadData: boolean = false;

  getUser = (userid: string): void => {
    this.fetchApiData.sleeperGet(`/user/${userid}`)
      .subscribe({
        next: res => {
          this.users.push(res);
          this.usernames.push(res.username);
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
          });
          this.loadData = true
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
