import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Joke {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  joke$ = new BehaviorSubject<Joke | null>(null);
  error$ = new BehaviorSubject<string | null>(null);
  private readonly apiUrl = 'https://official-joke-api.appspot.com/random_joke';
  private readonly http = inject(HttpClient);

  fetchJoke() {
    this.http.get<Joke>(this.apiUrl).subscribe({
      next: (joke) => this.joke$.next(joke),
      error: (err) => {
        console.error('Error fetching joke:', err);
        this.joke$.next(null);
      },
    });
  }
}
