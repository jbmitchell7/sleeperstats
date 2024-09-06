import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { StandingsData } from 'src/app/interfaces/standingsData';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const TITLE_TEXT = 'Team/Manager Trends';

const SUBTITLE_TEXT = [
  'Better teams are higher right',
  'More successful teams are higher up',
  'Better managers have larger dots',
  'Dot size is % of max points the team scored'
];

const colors = [
  '#e6194b',
  '#3cb44b',
  '#ffe119',
  '#4363d8',
  '#f58231',
  '#911eb4',
  '#46f0f0',
  '#f032e6',
  '#bcf60c',
  '#fabebe',
  '#008080',
  '#e6beff',
  '#9a6324',
  '#fffac8',
  '#800000',
  '#aaffc3',
  '#808000',
  '#ffd8b1',
  '#000075',
  '#808080',
  '#ffffff',
  '#000000'
];

@Component({
    selector: 'ui-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.scss'],
    standalone: true,
    imports: [CommonModule, ChartModule, ProgressSpinnerModule],
})
export class GraphComponent implements OnChanges {
  @Input({required: true}) standingsData!: StandingsData[];

  chartData: any;
  chartOptions: any;
  isLoading = true;
  mobileBrowser = JSON.parse(localStorage.getItem('mobile') as string);

  #minRadiusSize!: number;
  readonly #MIN_OFFSET = this.mobileBrowser ? 3 : 5;

  ngOnChanges(): void {
    if (this.standingsData?.length && this.isLoading) {
      this.#getRadiusRange(this.standingsData);
      const data = this.standingsData.map(team => ({
        x: team.maxPoints,
        y: team.wins,
        r: this.#getRadiusValue(team.points, team.maxPoints),
        manager: team.username,
        points: team.points,
        losses: team.losses
      }));
      this.#setupChart(data);
      this.isLoading = false;
    }
  }

  #setupChart(data: any[]): void {
    this.chartData = {
      labels: data.map(team => team.manager),
      datasets: [
        {
          data,
          backgroundColor: data.map((_, i) => colors[i])
        }
      ]
    };

    const scaleBorder = {
      grid: {
        color: 'white',
      }
    };
    
    this.chartOptions = {
      layout: {
        padding: 20
      },
      scales: {
        y: {
          ...scaleBorder,
          min: 0
        },
        x: scaleBorder
      },
      aspectRatio: this.mobileBrowser ? 0.6 : 1,
      plugins: {
        legend: {
          display: false
        },
        subtitle: {
          display: true,
          text: SUBTITLE_TEXT,
          position: 'bottom',
          padding: 30,
          color: 'white',
          font: {
            size: '14rem'
          }
        },
        title: {
          display: true,
          text: TITLE_TEXT,
          padding: 30,
          color: 'white',
          font: {
            size: '24rem'
          }
        },
        tooltip: {
          displayColors: false,
          callbacks: {
            label: (context: any) => {
              const team = context.dataset.data[context.dataIndex];
              const points = team.points;
              const max = team.x;
              const record = `${team.y}-${team.losses}`
              return [`Points: ${points}`, `Max Points: ${max}`, `Record: ${record}`];
            }
          }
        }
      }
    }
  }

  #getRadiusRange(standings: StandingsData[]): void {
    const scoringPercents = standings.map(team => (team.points / team.maxPoints * 100));
    // offset to guarantee radius is at least the offset value
    this.#minRadiusSize = Math.floor(Math.min(...scoringPercents)) - this.#MIN_OFFSET;
  }

  #getRadiusValue(points: number, maxPoints: number): number {
    const pointsPercent = (points / maxPoints) * 100;
    // ceiling here to ensure value of at least 1 plus offset
    return Math.ceil(pointsPercent - this.#minRadiusSize);
  }
}
