import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueComponent } from './league.component';
import { StandingsComponent } from 'src/app/components/standings/standings.component';
import { GraphComponent } from 'src/app/components/graph/graph.component';

const routes: Routes = [
  {
    path: '',
    component: LeagueComponent,
    children: [
      { path: '', redirectTo: 'standings', pathMatch: 'full' },
      { path: 'standings', component: StandingsComponent },
      { path: 'visuals', component: GraphComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueRoutingModule {}
