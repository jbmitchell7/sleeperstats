import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { SportStateComponent } from './sport-state/sport-state.component';
import { RosterComponent } from './roster/roster.component';
import { PlayersComponent } from './players/players.component';
import { LeagueComponent } from './league/league.component';
import { GraphComponent } from './graph/graph.component';
import { WelcomeComponent } from './welcome/welcome.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'league-dashboard', component: LeagueComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' }
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SportStateComponent,
    RosterComponent,
    PlayersComponent,
    LeagueComponent,
    GraphComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    NgxChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
