import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';

import { MessageService } from './message.service'

@Injectable({providedIn: 'root'})
export class HeroService {

  private heroesUrl = 'api/heroes'; // URL to web api
  
  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  getHero(id: number): Observable<Hero[]> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero[]>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero ${id}`))
    );
  }
  
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: Send error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: Better job of transforming error for user consumption.
      this.log(`${operation} failed ${error.message}`)

      return of(result as T);
    }
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }
}
