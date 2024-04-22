import { Component, Input, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';
import { FavoritesService } from '../favorites.service';
import { AuthService } from '../services/auth.service';
import { heartSharp, trashSharp, trash, personCircleOutline, statsChartOutline, navigateOutline, heartOutline, personOutline, homeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MatDialog} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { IonHeader, IonItemOption, IonTitle, IonContent, IonItemSliding, IonItem, IonAvatar, IonLabel, IonBadge, IonItemOptions, IonIcon, IonList, IonBackButton, IonButtons, IonToolbar, IonModal, IonDatetime, IonImg, IonButton, IonFooter } from "@ionic/angular/standalone";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonFooter, IonButton, IonImg, IonDatetime, IonModal, RouterModule, IonToolbar, IonButtons, IonBackButton, IonList, IonIcon, IonItemOptions, IonBadge, IonLabel, IonAvatar, IonItem, IonItemSliding, IonContent, IonTitle, IonItemOption, IonHeader, CommonModule, FormsModule]
})
export class FavoritesPage implements OnInit {

  public movies: MovieResult[] | null = null;
  public favorites: MovieResult[];
  public isFavorite = false;
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  authService = inject(AuthService)
  public movie: WritableSignal<MovieResult | null> = signal(null);
  public detailsPageUrl: any
  
  constructor(public dialog: MatDialog, private alertController: AlertController, private toastController: ToastController, private route: ActivatedRoute, private movieService: MovieService, public favoritesService: FavoritesService, private router: Router ) {
    this.favorites = [];
   
    this.detailsPageUrl = this.router.url.replace('/favorites', '/details');
    addIcons({ heart: heartSharp, trash: trashSharp, personCircleOutline, statsChartOutline, navigateOutline, heartOutline, personOutline, homeOutline });
   }
   @Input()
  set id(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      this.movie.set(movie);
     
      if (movie) {
        this.isFavorite = !this.isFavorite; // Toggle isFavorite
        if (this.isFavorite) {
          // If movie is now favorite, add it to favorites list
          this.favoritesService.addToFavorites(movie);
        }
        
    }
   
    });
  }


 

  openModal(movieId: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '650px',
      width: '600px',
      data: { id: movieId },
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close event
    });

    // Listen for clicks outside of the modal to close it
    
  }




  public async removeFromFavorites(movie: any) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this movie?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Delete',
          handler: async() => {
    if (movie) {
      // Remove the movie from favorites list
      this.favoritesService.removeFromFavorites(movie);
      console.log("Movie has been deleted", movie);
      // Update the favorites array in the component
      this.favorites = this.favorites.filter((m) => m.id !== movie.id);
  
      // Display a toast message
      const toast = await this.toastController.create({
        icon: trash,
        message: 'Movie deleted from Favorites!',
        position: 'bottom',
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }
  }
   }
    ]
  });
  alert.present();

}



  isFavoritesEmpty(): boolean {
    return this.favorites.length === 0;
    }
 




    

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites(this.favorites);
    console.log("Movies Favorited ", this.favorites)
    this.route.paramMap.subscribe(params => {
      const movieId = params.get('id');
      if (movieId) {
        this.movieService.getMovieDetails(movieId).subscribe(movie => {
          this.movies = [movie];
          console.log("movie ", movie)

        });
      }

      
    });
    
}
  
}