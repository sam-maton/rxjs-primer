import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, map, of, shareReplay, startWith, switchMap } from 'rxjs';

export interface Joke {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}

export interface JokeState {
  joke: Joke | null;
  error: string | null;
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  private readonly apiUrl = 'https://official-joke-api.appspot.com/random_joke';
  private readonly http = inject(HttpClient);

  private readonly refreshSubject = new Subject<void>();
  private readonly refresh$ = this.refreshSubject.asObservable();

  readonly state$: Observable<JokeState> = this.refresh$.pipe(
    startWith(void 0),
    switchMap(() =>
      this.http.get<Joke>(this.apiUrl).pipe(
        map(
          (joke): JokeState => ({
            joke,
            error: null,
            loading: false,
          }),
        ),
        startWith({
          joke: null,
          error: null,
          loading: true,
        } satisfies JokeState),
        catchError((err) => {
          console.error('Error fetching joke:', err);
          return of<JokeState>({
            joke: null,
            error: 'Failed to fetch joke. Please try again.',
            loading: false,
          });
        }),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  fetchJoke() {
    this.refreshSubject.next();
  }
}
