import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { LeaguePageData } from 'src/app/interfaces/leaguePageData';
import { selectLeaguePageData } from 'src/app/store/selectors';

const SUBTITLE_TEXT =
  'Better teams are further right and more successful teams are further up \n Better managers have larger dots - dot size is proportional to the percentage of max points the team has scored';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit, OnDestroy {
  readonly #store = inject(Store);
  #sub!: Subscription;
  leaguePageData!: LeaguePageData[];
  chartOptions!: AgChartOptions;

  ngOnInit(): void {
    this.#sub = this.#store
      .select(selectLeaguePageData)
      .pipe(
        tap((lp) => {
          this.leaguePageData = lp;
          this.#initChart();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }

  #initChart(): void {
    this.chartOptions = {
      autoSize: true,
      height: 600,
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
          type: 'bubble',
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
