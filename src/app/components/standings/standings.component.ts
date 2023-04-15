import { Component, OnInit, Input } from '@angular/core';
import { LeaguePageData } from '../league/league.component';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  leagueName = localStorage.getItem('leagueName');
  tableData: LeaguePageData[] = [];
  dataLoaded: boolean = false;
  year: any = '';
  displayedColumns: string[] = [
    'username',
    'points',
    'max-points',
    'points-against',
    'wins',
    'losses'
  ];

  @Input() leaguePageData: any;

  constructor(
  ) { }

  ngOnInit(): void {
    this.setTableData();
  }

  setTableData = (): void => {
    this.tableData = this.leaguePageData;
    this.dataLoaded = true;
    this.year = localStorage.getItem('leagueYear');
  }

}
