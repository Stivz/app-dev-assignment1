import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImageService } from '../services/image.service';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import { heartOutline, homeOutline, navigateOutline, personCircleOutline, personOutline, statsChartOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class SettingsPage implements OnInit {
  images: string[] = [];
  fileToUpload: File | null = null;
  hasAvatar = false;

  public authService = inject(AuthService)

  constructor(public imageService: ImageService ) {
    addIcons({ personCircleOutline, statsChartOutline, navigateOutline, heartOutline, personOutline, homeOutline });

    this.images = this.imageService.getImages();
    console.log('Images in Main Component:', this.images);
   }

   onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const imageUrl = e.target.result;
      this.imageService.addImage(imageUrl);
      event.target.value = null;
    };

    reader.readAsDataURL(file);
    console.log("File: ", (file))
  }
  ngOnInit() {
  }

}
