import { Component, Inject, Input, OnInit, WritableSignal, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';
import { IonButton, IonButtons, IonTitle, IonToolbar, IonInput, IonLabel, IonItem, IonContent, IonAvatar, IonCard, IonList, IonIcon, IonHeader, IonText } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { cashOutline, calendarOutline, alarm } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonText, IonHeader, IonIcon, IonList, IonCard, IonAvatar, IonContent, IonItem, IonLabel, IonInput, IonToolbar, IonTitle, IonButtons, IonButton, FormsModule, CommonModule],
})
export class ModalComponent  implements OnInit {
  public movie: WritableSignal<MovieResult | null> = signal(null);
  public imageBaseUrl = 'https://image.tmdb.org/t/p';

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public movieService: MovieService
  ) { 
    addIcons({ cashOutline, calendarOutline, alarm });
  }

    // @Input()
    // set id(movieId: string) {
    //   this.movieService.getMovieDetails(movieId).subscribe((movie) => {
    //     this.movie.set(movie);
        
    //   });
    // }

      
    // Replace spaces with dashes and remove special characters
    formatMovieTitle(title: string): string {
      return title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
    }

    formatMovieTitleForRottenTomatoes(title: string): string {
      // Replace spaces with underscores and convert to lowercase
      return title.toLowerCase().replace(/\s+/g, '_');
    }

    convertToHoursAndMinutes(minutes: number): string {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    }

    // Close the Modal
    cancel(): void {
      this.dialogRef.close();
    }

    
    ngOnInit() {
      if (this.data && this.data.id) { // Check if data and id are provided
        this.movieService.getMovieDetails(this.data.id).subscribe((movie) => {
          this.movie.set(movie);
          console.log("clicked movie: ", movie)
        });
      }
    }
}
