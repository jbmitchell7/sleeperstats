import { Component, OnInit, Input } from '@angular/core';
import { LeaguePageData } from '../league/league.component';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnInit {
  @Input() leaguePageData!: any;
  @Input() leagueYear!: string;
  @Input() leagueName!: string;
  tableData: LeaguePageData[] = [];
  dataLoaded: boolean = false;
  displayedColumns: string[] = [
    'username',
    'points',
    'max-points',
    'points-against',
    'wins',
    'losses',
  ];

  ngOnInit(): void {
    this.#setTableData();
  }

  #setTableData(): void {
    this.tableData = this.leaguePageData;
    this.dataLoaded = true;
  }
}
