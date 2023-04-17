import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { League } from '../../interfaces/league';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  @Input() leagueIdInput = ''

  constructor(
    private readonly fetchApiData: FetchApiDataService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) { }

  setLeagueId(): void {
    this.fetchApiData.sleeperGet(`/league/${this.leagueIdInput}`)
      .subscribe({
        next: (res: League) => {
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
