import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType, LegendItem } from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { LeaguePageData } from '../league/league.component';

Chart.register(ChartAnnotation);

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
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (item: any): string => {
            let team = this.chartLabels[item.dataIndex];
            return `${team.name} || ${team.record} || ${team.points} || ${team.maxPoints}`;
          }
        }
      },
      annotation: {
        annotations: {
          percentMedian: {
            type: 'line',
            yMin: 90,
            yMax: 90,
            display: true,
            borderColor: 'black',
            borderWidth: 2,
            //label: 'Median Percent'
          },
          pointsMedian: {
            type: 'line',
            xMin: 1800,
            xMax: 1800,
            borderColor: 'black',
            borderWidth: 2,
            //label: 'Median Max Points'
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Max Points'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Percentage of Max Points',
        }
      }
    }
  };

  chartLabels: any[] = [];

  public bubbleChartData: ChartData<'bubble'> = {
    labels: this.chartLabels,
    datasets: [
      {
        data: [],
        label: 'League Title Here',
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
          'pink',
          'black',
          'gray',
          'indigo',
          'lime',
          'olive',
          'teal'
        ],
        hoverBackgroundColor: 'black',
        hoverBorderColor: 'black',
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
      this.chartLabels.push(
        {
          name: team.username,
          record: `Record: ${team.wins}-${team.losses}`,
          points: `Points Scored: ${team.points}`,
          maxPoints: `Max Points: ${team.max_points}`
        }
      );
    })
  }

  updateChartData = (): void => {
    this.leaguePageData.forEach((element: LeaguePageData) => {
      this.bubbleChartData.datasets[0].data.push(
        {
          x: element.max_points,
          y: (element.points / element.max_points) * 100,
          r: 2 + element.wins * (14 / (element.wins + element.losses)),
        }
      );
    });
  }
}
