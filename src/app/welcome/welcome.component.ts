import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { League } from '../data/league';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @Input() leagueIdInput = ''

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  setLeagueId = (): void => {
    this.fetchApiData.sleeperGet(`/league/${this.leagueIdInput}`)
      .subscribe({
        next: (res: League) => {
          console.log(res);
          if (res.status != 'in_season' && res.status != 'post_season' && res.status != 'complete') {
            localStorage.setItem('leagueId', res.previous_league_id);
          } else {
            localStorage.setItem('leagueId', this.leagueIdInput);
          }
          localStorage.setItem('leagueName', res.name);
          this.router.navigate(['league-dashboard']);
        },
        error: () => {
          this.snackBar.open('Not a valid League ID', 'OK', { duration: 1000 })
        },
      })
  }
}
