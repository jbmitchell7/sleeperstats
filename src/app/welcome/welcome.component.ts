import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  status: any = {};

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
        next: () => {
          localStorage.setItem('leagueId', this.leagueIdInput);
          this.router.navigate(['league-dashboard']);
        },
        error: () => {
          this.snackBar.open('Not a valid League ID', 'OK', { duration: 1000 })
        },
      })
  }
}
