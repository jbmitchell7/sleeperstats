import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeagueComponent } from './components/league/league.component';
import { GraphComponent } from './components/graph/graph.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { StandingsComponent } from './components/standings/standings.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { leagueReducer } from './store/league/league.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { rostersReducer } from './store/rosters/rosters.reducers';
import { GlobalEffects } from './store/global.effects';
import { playersReducer } from './store/players/players.reducers';

@NgModule({
  declarations: [
    AppComponent,
    LeagueComponent,
    GraphComponent,
    WelcomeComponent,
    StandingsComponent,
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
    MatCardModule,
    AgGridModule,
    NgChartsModule,
    StoreModule.forRoot({
      leagueData: leagueReducer,
      rosterData: rostersReducer,
      playersData: playersReducer,
    }),
    EffectsModule.forRoot([GlobalEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
