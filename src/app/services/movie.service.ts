import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResult, MovieResult } from './interfaces';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MovieService {
private http = inject(HttpClient);

  constructor() { }

  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`).pipe(
      delay(500)
    )
  }


  getMovieDetails(id: string): Observable<MovieResult> {
    return this.http.get<MovieResult>(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  }

  searchMovies(query: string, page: number): Observable<any> {
    const url = `${BASE_URL}/search/movie?query=${query}&page=${page}&api_key=${API_KEY}`;
    return this.http.get<any>(url);
  }

  
}
