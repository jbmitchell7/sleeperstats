import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AgChartsAngularModule } from 'ag-charts-angular';
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
    AgGridModule,
    AgChartsAngularModule,
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
