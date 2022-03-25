import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { LeaguePageData } from '../league/league.component';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  constructor(
  ) { }

  @Input() leaguePageData: any;

  ngOnInit(): void {
    this.updateChartData();
    this.setLabels();
  }

  public bubbleChartType: ChartType = 'bubble';

  public bubbleChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
      },
      y: {
      }
    },
  };

  chartLabels: string[] = [];

  public bubbleChartData: ChartData<'bubble'> = {
    labels: this.chartLabels,
    datasets: [
      {
        data: [],
        label: 'Points Scored vs Potential Points Scored',
        backgroundColor: [
            'red',
            'green',
            'blue',
            'purple',
            'yellow',
            'brown',
            'magenta',
            'cyan',
            'orange',
            'pink'
        ],
        hoverBackgroundColor: 'black',
        hoverBorderColor: 'black'
      },
    ],
  };

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  setLabels = (): void => {
    this.leaguePageData.forEach((team: LeaguePageData) => {
        this.chartLabels.push(team.username);
    })
  }

  updateChartData = (): void => {
    this.leaguePageData.forEach((element: LeaguePageData) => {
      this.bubbleChartData.datasets[0].data.push({ x: element.points, y: element.max_points, r: element.wins * (16 / (element.wins + element.losses)) });
    });
  }
}
