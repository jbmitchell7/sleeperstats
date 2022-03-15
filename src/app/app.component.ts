import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from './fetch-api-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  status: any = {}

  constructor(
    public fetchApiData: FetchApiDataService,
  ) { }

  ngOnInit(): void {
    this.getStatus();
  }

  getStatus(): void {
    this.fetchApiData.sleeperGet("/state/nfl").subscribe((res: any) => {
      this.status = res;
      return this.status;
    })
  }
}
