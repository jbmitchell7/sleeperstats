import { NgModule } from '@angular/core';
import { LeagueRoutingModule } from './league-routing.module';
import { LeagueComponent } from './league.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { StandingsComponent } from './standings/standings.component';
import { AgGridModule } from 'ag-grid-angular';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { GraphComponent } from './graph/graph.component';
import { TeamsComponent } from './teams/teams.component';
import { LeaguePageHeaderComponent } from 'src/app/components/league-page-header/league-page-header.component';
@NgModule({
  declarations: [
    LeagueComponent,
    StandingsComponent,
    GraphComponent,
    TeamsComponent
  ],
  imports: [
    CommonModule,
    LeagueRoutingModule,
    AgGridModule,
    AgChartsAngularModule,
    SidebarComponent,
    LeaguePageHeaderComponent
  ],
  providers: [],
})
export class LeagueModule {}
