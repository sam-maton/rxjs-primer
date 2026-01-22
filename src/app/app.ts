import { Component, inject } from '@angular/core';
import { JokeService } from './services/joke/joke.service';
import type { Joke } from './services/joke/joke.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly jokeService = inject(JokeService);
  joke: Joke | null = null;
  error: string | null = null;
  constructor() {
    this.jokeService.fetchJoke();
    this.jokeService.joke$.subscribe((joke) => {
      this.joke = joke;
    });
    this.jokeService.error$.subscribe((error) => {
      this.error = error;
    });
  }
}
