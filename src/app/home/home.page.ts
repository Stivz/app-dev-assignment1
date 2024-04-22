import { Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { IonSelect, IonSelectOption, IonHeader, IonMenuButton, IonToolbar, IonTitle, IonContent, InfiniteScrollCustomEvent, IonList, IonItem, IonAvatar, IonSkeletonText, IonAlert, IonLabel, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent, IonButton, IonRadio, IonSearchbar, IonItemOptions, IonItemOption, IonIcon, IonItemSliding, IonRadioGroup, IonMenu, IonButtons, IonItemDivider, IonItemGroup, IonFooter, IonText, IonInput, IonDatetime, IonDatetimeButton, IonModal } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { Observable, catchError, finalize } from 'rxjs';
import { ApiResult, Genre, MovieResult } from '../services/interfaces';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { checkmarkCircleOutline, heartSharp, moon, sunny, statsChartOutline, navigateOutline, heartOutline, personOutline, homeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FavoritesService } from '../favorites.service';
import { ToastController } from '@ionic/angular';
import { DarkModeService } from '../services/dark-mode.service';
import { NgFor, } from '@angular/common';
import { NgModel } from '@angular/forms';
import { personCircleOutline } from 'ionicons/icons';
import { ImageService } from '../services/image.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonModal, IonDatetimeButton, IonDatetime, IonInput,  IonSelect, IonSelectOption, NgFor, IonText, IonFooter, IonItemGroup, IonItemDivider, IonButtons, IonRadioGroup, IonItemSliding, IonIcon, IonItemOption, IonItemOptions, IonSearchbar, IonRadio, IonButton, IonInfiniteScrollContent, IonInfiniteScroll, 
    DatePipe,
    IonLabel,
    IonAlert,  
    IonSkeletonText, 
    IonAvatar, 
    IonItem, IonList, 
    IonHeader,
    IonToolbar, 
    IonTitle, 
    IonContent,
    RouterModule,
    IonBadge,
    FormsModule,
    IonMenu,
    IonMenuButton
  ],
})
export class HomePage {
  private movieService = inject(MovieService);
  private currentPage = 1;
  public error = null;
  public isLoading = false;
  public movies: MovieResult[] = [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public dummyArray = new Array(8);
  authService = inject(AuthService)
  public movie: WritableSignal<MovieResult | null> = signal(null);
  public isFavorite = false;
  private favorites: MovieResult[] = [];
  private movieIsInFavorites = inject(FavoritesService)
  public isRecentFilterSelected = false;
  public isRatedFilterSelected = false;
  public searchTerm: string = '' ;

  images: string[] = [];
  fileToUpload: File | null = null;



  public genresArray = [
    { id: 1, name: 'Science Fiction' },
    { id: 2, name: 'Adventure' },
    { id: 3, name: 'Animation' },
    { id: 4, name: 'Action' },
    { id: 5, name: 'Family' },
    { id: 6, name: 'Comedy' },
    { id: 7, name: 'Fantasy' },
    { id: 8, name: 'Thriller' },
    { id: 9, name: 'Crime' },
    { id: 10, name: 'Drama' },
    { id: 11, name: 'Mystery' },
    { id: 12, name: 'Romance' },
    { id: 13, name: 'War' },
    { id: 14, name: 'Horror' }
];
  

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
  
  constructor(public imageService: ImageService, public darkModeService: DarkModeService,private toastController: ToastController, private router: Router, public favoritesService: FavoritesService) {
    addIcons({ heart: heartSharp, checkmarkCircleOutline, sunny, moon, personCircleOutline, statsChartOutline, navigateOutline, heartOutline, personOutline, homeOutline });
    this.loadMovies();
    
    this.images = this.imageService.getImages();
    console.log('Images in Main Component:', this.images);
   }

   
  
   onFileSelected(event: any) {
    this.imageService.onFileSelected(event);
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();

  }

  searchMovies(event: CustomEvent) {
    const searchTerm: string = event.detail.value.toLowerCase();
    this.searchTerm = searchTerm
   
    this.movies = [];
    this.currentPage = 1;
    this.loadMovies();
  }



  filterByRecent() {
    const currentYear = new Date().getFullYear();
    console.log("Current year: ", currentYear);
  
    if (this.isRecentFilterSelected) {
      this.isRecentFilterSelected = false;
      this.currentPage = 1;
      this.movies = [];
      this.loadMovies();
    } else {
      // Filter movies by release date and search term
      this.movies = this.movies.filter(movie =>
        movie.release_date.includes(currentYear.toString()) &&
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      // Set the filter as selected
      this.isRecentFilterSelected = true;
    }
  }
  
  filterByRated() {
    const minVoteAverage = 8;
  
    if (this.isRatedFilterSelected) {
      // If the filter is already selected, deselect it and reset the movie list
      this.isRatedFilterSelected = false;
      // Reload movies to display all movies
      this.currentPage = 1;
      this.movies = [];
      this.loadMovies();
    } else {
      // Filter movies by vote average and search term
      this.movies = this.movies.filter(movie =>
        movie.vote_average >= minVoteAverage &&
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      // Set the filter as selected
      this.isRatedFilterSelected = true;
    }
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
        color: 'success'
      });
      toast.present();

    }
  }
 

  
  

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;
    let movieObservable: Observable<ApiResult>;

    if (!event) {
      this.isLoading = true;
    }

    if (this.searchTerm.trim() !== '') {
      movieObservable = this.movieService.searchMovies(this.searchTerm, this.currentPage);
    } else {
      // this.currentPage = 1; // Reset current page to 1
      movieObservable = this.movieService.getTopRatedMovies(this.currentPage);
    }

      movieObservable.pipe(
        finalize(() => {
          this.isLoading = false;
          if (event) {
            event.target.complete();
          }
        }),
        catchError((err: any) => {
          console.log(err);
          this.error = err.error.status_message;
          return [];
        })
      ).subscribe({
        next: (res) => {
          console.log("next page", res);
          this.movies.push(...res.results);
          if (event) {
            event.target.disabled = res.total_pages === this.currentPage;
          }
        }
      });
    }


   

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
    console.log("Console ", event)
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
 
   }
}
