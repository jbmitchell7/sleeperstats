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
  @Input() leaguePageData: any;
  bubbleChartType: ChartType = 'bubble';
  chartLabels: any[] = [];
  bubbleChartOptions: ChartConfiguration['options'] = {
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
          text: 'Wins',
        }
      }
    }
  };
  bubbleChartData: ChartData<'bubble'> = {
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

  ngOnInit(): void {
    this.#updateChartData();
    this.#setLabels();
  }

  #setLabels(): void {
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

  #updateChartData(): void {
    this.leaguePageData.forEach((element: LeaguePageData) => {
      this.bubbleChartData.datasets[0].data.push(
        {
          x: element.max_points,
          y: element.wins,
          r: (element.points / element.max_points != 1) ?
            90 * (1 / (100 - ((element.points / element.max_points) * 100))) : 10,
        }
      );
    });
  }

  // example event methods
  // chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }
}
