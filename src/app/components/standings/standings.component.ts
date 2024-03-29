import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { GridOptions, ColDef, GridApi } from 'ag-grid-community';
import { LeaguePageData } from '../../interfaces/leaguePageData';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest, filter, tap } from 'rxjs';
import { selectLeague, selectLeaguePageData } from '../../store/selectors';

const SMALL_COL_WIDTH = 100;
const MED_COL_WIDTH = 150;
const LARGE_COL_WIDTH = 250;

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnInit, OnDestroy {
  readonly #store = inject(Store);
  #sub!: Subscription;
  leaguePageData!: LeaguePageData[];
  leagueYear!: string;
  leagueName!: string;
  api!: GridApi;
  dataLoaded: boolean = false;
  gridOptions!: GridOptions;
  gridWidth = SMALL_COL_WIDTH * 4 + MED_COL_WIDTH + LARGE_COL_WIDTH + 5;
  gridHeight!: number;

  ngOnInit(): void {
    this.#sub = combineLatest([
      this.#store.select(selectLeaguePageData),
      this.#store.select(selectLeague),
    ])
      .pipe(
        filter(([lp, l]) => !!lp.length && !!l.name),
        tap(([lp, l]) => {
          this.leaguePageData = lp;
          this.leagueName = l.name;
          this.leagueYear = l.season;
          this.#initGrid();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }

  #initGrid(): void {
    this.gridOptions = {
      onGridReady: (event) => {
        event.api.sizeColumnsToFit();
      },
      defaultColDef: {
        width: SMALL_COL_WIDTH,
        sortable: true,
        sortingOrder: ['desc', 'asc'],
        suppressMovable: true,
      },
      columnDefs: this.#getColDefs(),
      rowData: this.leaguePageData,
      animateRows: true,
    };
    this.gridHeight = this.leaguePageData.length * 50 - 10;
    this.dataLoaded = true;
  }

  #getColDefs(): ColDef[] {
    return [
      {
        field: 'username',
        headerName: 'Manager',
        width: LARGE_COL_WIDTH,
        sortable: false,
      },
      { field: 'wins', sort: 'desc' },
      { field: 'losses' },
      { field: 'maxPoints', headerName: 'Max Points', width: MED_COL_WIDTH },
      { field: 'points', headerName: 'PF' },
      { field: 'pointsAgainst', headerName: 'PA' },
    ];
  }
}
