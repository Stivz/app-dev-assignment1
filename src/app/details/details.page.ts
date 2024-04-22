import { Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';
import { cashOutline, calendarOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FavoritesService } from '../favorites.service';
import { RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { checkmarkCircleOutline } from 'ionicons/icons';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule,]
})
export class DetailsPage {
  private movieService = inject(MovieService);
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public movie: WritableSignal<MovieResult | null> = signal(null);
  public isFavorite = false;
  public movies: MovieResult[] | null = null;
  private favorites: MovieResult[] = [];
  private movieIsInFavorites = inject(FavoritesService)
  
  constructor(public dialogRef: MatDialog,private toastController: ToastController, public favoritesService: FavoritesService,) { 
    addIcons({ cashOutline, calendarOutline, checkmarkCircleOutline });
   
   }
  @Input()
  set id(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      this.movie.set(movie);
    
    });
  

  }




  public async addToFavorites(movie: MovieResult) {
    if (!this.movieIsInFavorites.isInFavorites(movie)) {
      this.favorites.push(movie);
      console.log("favorited ", movie);
      console.log("is Favorited? ", this.favorites);
  
      // Display a toast message with a green tick icon
      const toast = await this.toastController.create({
        icon: checkmarkCircleOutline,
        message: 'Movie added to Favorites!',
        position: 'bottom',
        duration: 3000,
        color: 'success',
      });
      toast.present();

    }
  }

 
}
 
  

