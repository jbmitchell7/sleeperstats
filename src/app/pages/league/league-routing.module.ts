import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueComponent } from './league.component';
import { StandingsComponent } from './standings/standings.component';
import { GraphComponent } from './graph/graph.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  {
    path: '',
    component: LeagueComponent,
    children: [
      { path: '', redirectTo: 'standings', pathMatch: 'full' },
      { path: 'standings', component: StandingsComponent },
      { path: 'visuals', component: GraphComponent },
      { path: 'teams', component: TeamsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueRoutingModule {}
