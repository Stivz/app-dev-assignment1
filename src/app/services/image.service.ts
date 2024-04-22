import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private images: string[] = [];

  constructor() { }

  addImage(imageUrl: string) {
    console.log('Adding image:', imageUrl);
    
    // If there is already an image, replace it with the new one
    if (this.images.length > 0) {
      this.images[0] = imageUrl;
    } else {
      this.images.push(imageUrl);
    }
    
    console.log('Images:', this.images);
  }

  getImages() {
    return this.images;
  }

  public onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const imageUrl = e.target.result;
      this.addImage(imageUrl);
    };

    reader.readAsDataURL(file);
  }
  


}

 
 
 