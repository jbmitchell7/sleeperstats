import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EChartsOption } from 'echarts';

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
  chartData: any = [];

  chartOption: EChartsOption = {
    title: {
      text: "Points Scored/Potential Points",
      left: 'center',
      top: 0
    },
    xAxis: {
      type: 'value',
      min: (value) => { return value.min - 50 },
      max: (value) => { return value.max + 50 },
    },
    yAxis: {
      type: 'value',
      min: (value) => { return value.min - 50 },
      max: (value) => { return value.max + 50 },
    },
    series: [
      {
        data: this.chartData,
        type: 'scatter',
        markLine: {
          lineStyle: {
            type: 'solid'
          },
          data: [
            [
              {
                coord: [0, 1500],
                symbol: 'none'
              },
              {
                coord: [1700, 1500],
                symbol: 'none'
              }
            ]
          ]
        }
      },
    ],
  };

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
            //this.getUser(element.owner_id);
            this.chartData.push([element.settings.fpts, element.settings.ppts]);
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
