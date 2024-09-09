import { Component, Input, OnChanges } from '@angular/core';
import { StandingsData } from 'src/app/data/interfaces/standingsData';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GRAPH_COLORS, SUBTITLE_TEXT, TITLE_TEXT } from '../../data/constants/graph.constants';
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
  mobileBrowser = JSON.parse(localStorage.getItem('MOBILE') as string);
  showPreseasonMessage = false;

  #minRadiusSize!: number;
  readonly #MIN_OFFSET = this.mobileBrowser ? 3 : 5;

  ngOnChanges(): void {
    if (this.standingsData?.length && this.isLoading) {
      if (this.standingsData[0].wins === 0 && this.standingsData[0].losses === 0) {
        this.showPreseasonMessage = true;
      } else {
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
      }
      this.isLoading = false;
    }
  }

  #setupChart(data: any[]): void {
    this.chartData = {
      labels: data.map(team => team.manager),
      datasets: [
        {
          data,
          backgroundColor: data.map((_, i) => GRAPH_COLORS[i])
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
            size: '18rem'
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
