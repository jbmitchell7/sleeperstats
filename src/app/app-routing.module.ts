import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LeagueComponent } from './pages/league/league.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'league-dashboard', component: LeagueComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
