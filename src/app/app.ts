import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { JokeService } from './services/joke/joke.service';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly jokeService = inject(JokeService);

  readonly state$ = this.jokeService.state$;

  newJoke() {
    this.jokeService.fetchJoke();
  }
}
