import { Component, Input, OnInit } from '@angular/core';
import { LeaguePageData } from 'src/app/interfaces/leaguePageData';
import { AgChartOptions } from 'ag-charts-community';

const SUBTITLE_TEXT =
  'Better teams are further right and more successful teams are further up \n Better managers have larger dots - dot size is proportional to the percentage of max points the team has scored';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  @Input() leaguePageData!: LeaguePageData[];
  chartOptions!: AgChartOptions;

  ngOnInit(): void {
    this.#initChart();
  }

  #initChart(): void {
    this.chartOptions = {
      autoSize: true,
      title: {
        text: 'Max Points vs Wins',
      },
      subtitle: {
        text: SUBTITLE_TEXT,
        spacing: 40,
      },
      axes: [
        {
          type: 'number',
          position: 'bottom',
        },
        {
          type: 'number',
          max: this.#getYMax(),
          position: 'left',
        },
      ],
      series: [
        {
          tooltip: {
            renderer: (params: any) => {
              return {
                title: params.datum.username,
              };
            },
          },
          type: 'scatter',
          data: this.leaguePageData,
          xKey: 'maxPoints',
          xName: 'Max Points',
          yKey: 'wins',
          yName: 'Wins',
          sizeKey: 'points',
          sizeName: 'Points',
          marker: {
            size: 6,
            maxSize: 30,
            fill: '#3f51b5',
            stroke: '#000',
          },
        },
      ],
    };
  }

  #getYMax(): number {
    return Math.max(...this.leaguePageData.map((team) => team.wins)) + 1;
  }
}
