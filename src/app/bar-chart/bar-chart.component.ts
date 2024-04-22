import Chart from 'chart.js/auto';
import { IonToolbar, IonTitle, IonContent } from "@ionic/angular/standalone";
import { ApiResult } from '../services/interfaces';
import { HomeDeferPage } from '../home-defer/home-defer.page';
import { Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';
import { cashOutline, calendarOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CurrencyPipe, DatePipe } from '@angular/common';



@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  standalone: true,
  imports: [IonContent, IonTitle, IonToolbar, HomeDeferPage],
})
export class BarChartComponent {
  private movieService = inject(MovieService);
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public movie: WritableSignal<MovieResult | null> = signal(null);

  @Input()
  set id(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      console.log(movie)
      this.movie.set(movie);
    });
  }


  constructor() { 
    addIcons({ cashOutline, calendarOutline });
   }


}