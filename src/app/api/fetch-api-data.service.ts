import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://api.sleeper.app/v1';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private readonly http: HttpClient) {}

  #handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  #extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  sleeperGet(url: String): Observable<any> {
    return this.http.get(`${apiUrl}/${url}`)
      .pipe(map(this.#extractResponseData), catchError(this.#handleError))
  }
}
