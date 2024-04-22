import { Component, Input, OnInit, WritableSignal, inject, signal, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiResult, MovieResult } from '../services/interfaces';
import { MovieService } from '../services/movie.service';
import { heartOutline, navigateOutline, personCircleOutline, personOutline, statsChartOutline, homeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterModule } from '@angular/router';
import { IonHeader, IonContent, IonFooter, IonToolbar, IonBackButton, IonButtons, IonTitle } from "@ionic/angular/standalone";
import Chart from 'chart.js/auto';
import { NgFor } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
  standalone: true,
  imports: [IonTitle, IonButtons, IonBackButton, IonToolbar, IonFooter, IonContent, IonHeader, CommonModule, FormsModule, RouterModule, NgFor]
})
export class DataPage implements OnInit {
  private movieService = inject(MovieService);
  topRatedMovies: MovieResult[] = [];
  movieDetails: MovieResult | null = null;
  totalResults: number = 0;
  totalRevenue: number = 0;
  genreCounts: Map<string, number> = new Map();
  public movies: MovieResult[] = [];

 
    
   
   



  // labels: string[] = ['Germany', 'USA', 'France', 'UK'];
  constructor() {
    addIcons({ personCircleOutline, statsChartOutline, navigateOutline, heartOutline, personOutline, homeOutline});

  }

  ngOnInit() {
    this.loadTopRatedMovies();
  }




  loadTopRatedMovies() {
    this.movieService.getTopRatedMovies().subscribe((data: ApiResult) => {
      this.topRatedMovies = data.results;
      console.log("Top Rated Movies: ", this.topRatedMovies);
  
      // Fetch details for each top rated movie and plot the bar chart
      forkJoin(
        this.topRatedMovies.map(movie => this.movieService.getMovieDetails(movie.id.toString()))
      ).subscribe(movieDetails => {
        // Now you have an array of movie details
        console.log("Movie Details: ", movieDetails);
  
        // Plot revenue and budget for each movie
        movieDetails.forEach((movie, index) => {
          this.plotBarChart(movie.title, movie.budget, movie.revenue, index);
        });
      });
    });
  }
  

  
  toggleChartVisibility(index: number) {
    const canvasId = `barChart_${index}`;
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    canvas.style.display = canvas.style.display === 'none' ? 'block' : 'none'; // Toggle display
  }

  
  // Function to plot bar chart
  plotBarChart(title: string, budget: number, revenue: number, index: number) {
    const canvasId = `barChart_${index}`;
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    ctx.style.display = 'block';
    const barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Budget', 'Revenue'],
        datasets: [
          {
            label: title,
            data: [budget, revenue],
            backgroundColor: ['#ff6384', '#36a2eb'],
            borderColor: ['#ff6384', '#36a2eb'],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
            
        }
      }
    });
  }
  // loadMovieDetails(id: string, index: number) {
  //   this.movieService.getMovieDetails(id).subscribe((data: MovieResult) => {
  //     this.topRatedMovies[index] = data;
  //     if (data.genres && data.genres.length > 0) {
  //       data.genres.forEach((genre) => {
  //         const count = this.genreCounts.get(genre.name) || 0;
  //         this.genreCounts.set(genre.name, count + 1);
  //       });
  //     }
  //   });
  // }



  // getGenreCountsArray() {
  //   return Array.from(this.genreCounts.entries());
  // }
}
  