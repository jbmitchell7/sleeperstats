import { Component, OnInit, Input } from '@angular/core';
import { LeaguePageData } from '../league/league.component';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
    this.setTableData();
  }

  @Input() leaguePageData: any;

  tableData: LeaguePageData[] = [];
  dataLoaded: boolean = false;

  setTableData = (): void => {
    this.tableData = this.leaguePageData;
    this.dataLoaded = true;
  }


  displayedColumns: string[] = ['username', 'points', 'max-points', 'points-against', 'wins', 'losses'];
}
