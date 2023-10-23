import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LeagueComponent } from './pages/league/league.component';
import { StandingsComponent } from './components/standings/standings.component';
import { GraphComponent } from './components/graph/graph.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'league',
    component: LeagueComponent,
    children: [
      { path: '', redirectTo: 'standings', pathMatch: 'full' },
      { path: 'standings', component: StandingsComponent },
      { path: 'visuals', component: GraphComponent },
    ],
  },
  { path: '**', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
