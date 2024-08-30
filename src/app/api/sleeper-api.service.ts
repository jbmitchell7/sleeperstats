import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { League } from '../interfaces/league';

const apiUrl = 'https://api.sleeper.app/v1';

@Injectable({
  providedIn: 'root'
})
export class SleeperApiService {
  readonly #http = inject(HttpClient);

  sleeperGet(url: String): Observable<any> {
    return this.#http.get(`${apiUrl}/${url}`);
  }

  getLeague(id: string): Observable<League> {
    return this.#http.get<League>(`${apiUrl}/league/${id}`);
  }
}
