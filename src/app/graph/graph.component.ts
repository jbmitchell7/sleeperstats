import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  constructor(
  ) { }

  @Input() rosterData: any;
  @Input() userData: any;

  ngOnInit(): void {
    this.updateRosterData();
  }

  public bubbleChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
      },
      y: {
      }
    },
  };

  public bubbleChartData: ChartData<'bubble'> = {
    //labels: this.usernames,
    datasets: [
      {
        data: [],
        label: 'Points Scored vs Potential Points Scored',
      },
    ]
  };
  public bubbleChartType: ChartType = 'bubble';

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  //roster data is what holds a team's total points

  updateRosterData = (): void => {
    this.rosterData.forEach((element: any) => {
      this.bubbleChartData.datasets[0].data.push({ x: element.settings.fpts, y: element.settings.ppts, r: element.settings.wins * 2 });
    });
  }
}
