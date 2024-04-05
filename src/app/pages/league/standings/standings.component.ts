import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { GridOptions, ColDef, GridApi } from 'ag-grid-community';
import { LeaguePageData } from '../../../interfaces/leaguePageData';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest, filter, tap } from 'rxjs';
import { selectLeague, selectLeaguePageData } from '../../../store/selectors';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnInit, OnDestroy {
  readonly #store = inject(Store);
  #sub!: Subscription;
  pageTitle!: string;
  leaguePageData!: LeaguePageData[];
  leagueYear!: string;
  leagueName!: string;
  api!: GridApi;
  dataLoaded: boolean = false;
  gridOptions!: GridOptions;
  maxGridWidth = 690

  @HostListener('window:resize')
  resizeGrid(): void {
    this.api.sizeColumnsToFit();
  }

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
          this.pageTitle = `${this.leagueName} Standings ${this.leagueYear}`;
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
        sortable: true,
        resizable: false,
        sortingOrder: ['desc', 'asc'],
        suppressMovable: true,
      },
      domLayout: 'autoHeight',
      columnDefs: this.#getColDefs(),
      rowData: this.leaguePageData,
      animateRows: true,
      autoSizeStrategy: {
        type: 'fitCellContents'
      }
    };
    this.dataLoaded = true;
  }

  #getColDefs(): ColDef[] {
    return [
      {
        field: 'username',
        headerName: 'Manager',
        pinned: 'left',
        resizable: true
      },
      {
        field: 'wins',
        sort: 'desc'
      },
      {
        field: 'losses'
      },
      {
        field: 'maxPoints',
        headerName: 'Max Points'
      },
      {
        field: 'points',
        headerName: 'PF'
      },
      {
        field: 'pointsAgainst',
        headerName: 'PA'
      },
    ];
  }
}
