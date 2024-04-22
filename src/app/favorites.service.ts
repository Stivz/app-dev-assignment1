import { Injectable, Input, WritableSignal, inject, signal } from '@angular/core';
import { MovieResult } from './services/interfaces';
import { MovieService } from './services/movie.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: MovieResult[] = [];
  public movie: WritableSignal<MovieResult | null> = signal(null);
  private movieService = inject(MovieService);


  public addToFavorites(movie: MovieResult) {
    if (!this.isInFavorites(movie)) {
      this.favorites.push(movie);
    

    }
  }

  public removeFromFavorites(movie: any) {
    this.favorites = this.favorites.filter((m) => m.id !== movie.id);
  }

  getFavorites(movie: any): MovieResult[] {
    console.log("current favorited movies: ", this.favorites)

    return this.favorites;
  }

  public isInFavorites(movie: MovieResult): boolean {
    return this.favorites.some((m) => m.id === movie.id);
  }

}