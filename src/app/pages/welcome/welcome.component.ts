import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { leagueEntryRequest } from '../../store/global.actions';
import { SleeperApiService } from '../../api/sleeper-api.service';
import { League } from '../../data/interfaces/league';
import { FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { catchError, of, take, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessagesModule, 
    FormsModule
  ],
  providers: [MessageService],
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  readonly #router = inject(Router);
  readonly #store = inject(Store);
  readonly #fetchApiDataService = inject(SleeperApiService);
  readonly #messageService = inject(MessageService);

  leagueInputForm = new FormControl<string>('', [Validators.required, Validators.minLength(3)]);

  setLeagueId(): void {
    let id = this.leagueInputForm.value ?? '';
    this.#fetchApiDataService.getLeague(id)
      .pipe(
        take(1),
        tap((res: League) => {
          if (
            res.status != 'in_season' &&
            res.status != 'post_season' &&
            res.status != 'complete'
          ) {
            id = res.previous_league_id;
          }
          this.#store.dispatch(leagueEntryRequest({ leagueId: id }));
          this.#router.navigate(['league']);
          localStorage.setItem('LEAGUE_ID', id);
        }),
        catchError(() => {
          this.#messageService.add({
            severity: 'error',
            summary: 'test',
            detail: 'Error retrieving league. Please confirm the id you entered is correct.',
            life: 2000
          })
          return of(null);
        })
      )
      .subscribe();
  }
}
