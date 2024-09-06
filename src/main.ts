import { enableProdMode, isDevMode } from '@angular/core';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { leagueReducer } from './app/store/league/league.reducer';
import { rostersReducer } from './app/store/rosters/rosters.reducers';
import { managersReducer } from './app/store/managers/managers.reducers';
import { provideEffects } from '@ngrx/effects';
import { GlobalEffects } from './app/store/global.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideServiceWorker } from '@angular/service-worker';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { WelcomeComponent } from './app/pages/welcome/welcome.component';
import { LeagueComponent } from './app/pages/league/league.component';
import { StandingsComponent } from './app/pages/league/standings/standings.component';
import { HomeComponent } from './app/pages/league/home/home.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'league',
    component: LeagueComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'standings', component: StandingsComponent }
    ],
  },
  { path: '**', redirectTo: 'welcome', pathMatch: 'prefix' },
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({
      leagueData: leagueReducer,
      rosterData: rostersReducer,
      managersData: managersReducer,
    }),
    provideEffects([GlobalEffects]),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), connectInZone: true }),
    provideHttpClient(),
    provideAnimations()
  ]
})
  .catch(err => console.error(err));
