import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
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

  //gets user display names

  public scatterChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
      },
      y: {
      }
    }
  };

  public scatterChartData: ChartData<'scatter'> = {
    labels: this.usernames,
    datasets: [
      {
        data: [],
        label: 'Points Scored vs Potential Points Scored',
        pointRadius: 10,
      },
    ]
  };
  public scatterChartType: ChartType = 'scatter';

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

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
            this.scatterChartData.datasets[0].data.push({ x: element.settings.fpts, y: element.settings.ppts });
          });
          this.loadData = true;
          console.log(this.rosters);
          console.log(this.usernames);
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
