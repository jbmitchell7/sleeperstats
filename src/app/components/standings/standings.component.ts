import { Component, OnInit, Input } from '@angular/core';
import { GridOptions, ColDef } from 'ag-grid-community';
import { LeaguePageData } from 'src/app/interfaces/leaguePageData';

const SMALL_COL_WIDTH = 100;
const MED_COL_WIDTH = 150;
const LARGE_COL_WIDTH = 250;

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnInit {
  @Input() leaguePageData!: LeaguePageData[];
  @Input() leagueYear!: string;
  @Input() leagueName!: string;
  dataLoaded: boolean = false;
  gridOptions!: GridOptions;
  gridWidth = SMALL_COL_WIDTH * 4 + MED_COL_WIDTH + LARGE_COL_WIDTH + 5;
  gridHeight!: number;

  ngOnInit(): void {
    this.#initGrid();
  }

  #initGrid(): void {
    this.gridOptions = {
      defaultColDef: {
        width: SMALL_COL_WIDTH,
        sortable: true,
        sortingOrder: ['desc', 'asc'],
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
      { field: 'points', headerName: 'PF' },
      { field: 'maxPoints', headerName: 'Max Points', width: MED_COL_WIDTH },
      { field: 'pointsAgainst', headerName: 'PA' },
    ];
  }
}
