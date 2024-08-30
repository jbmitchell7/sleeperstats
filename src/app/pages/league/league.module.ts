import { NgModule } from '@angular/core';
import { LeagueRoutingModule } from './league-routing.module';
import { LeagueComponent } from './league.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { StandingsComponent } from './standings/standings.component';
import { GraphComponent } from './graph/graph.component';
import { TeamsComponent } from './teams/teams.component';
import { LeaguePageHeaderComponent } from 'src/app/components/league-page-header/league-page-header.component';
import { NavbarComponent } from "../../components/navbar/navbar.component";
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
    SidebarComponent,
    NavbarComponent,
    LeaguePageHeaderComponent,
],
  providers: [],
})
export class LeagueModule {}
