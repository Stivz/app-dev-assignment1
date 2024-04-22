import { Component, OnInit } from '@angular/core';
import { IonAvatar, IonContent } from "@ionic/angular/standalone";
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: true,
  imports: [IonContent, IonAvatar, ]
})
export class AvatarComponent implements OnInit {

  images: string[] = [];
  fileToUpload: File | null = null;


  constructor(public imageService: ImageService) {
    this.images = this.imageService.getImages();
    console.log('Images in Main Component:', this.images);
   }

   public onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0] as File; // Store the selected file
  }

 public submit() {
    console.log('Submitting image...');
    if (this.fileToUpload) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = e.target.result;
        this.imageService.addImage(imageUrl);
        this.fileToUpload = null  // Reset the file after submission
        console.log("Reset :",this.fileToUpload)
        
      };
     
      reader.readAsDataURL(this.fileToUpload);
      
    } else {
      console.log('No file selected.');
    }
  }


  ngOnInit() {


  }


}
