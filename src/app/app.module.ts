import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { leagueReducer } from './store/league/league.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { rostersReducer } from './store/rosters/rosters.reducers';
import { GlobalEffects } from './store/global.effects';
import { playersReducer } from './store/players/players.reducers';
import { sharedDataReducer } from './store/global.reducers';
@NgModule({
  declarations: [AppComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    StoreModule.forRoot({
      sharedData: sharedDataReducer,
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
