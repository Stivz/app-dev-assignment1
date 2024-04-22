import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonBackButton, IonButtons, IonItem, IonAvatar, IonCard, IonFooter, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { heartOutline, homeOutline, navigateOutline, personCircleOutline, personOutline, statsChartOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonIcon, IonFooter, IonCard, IonAvatar, IonItem, IonButtons, IonBackButton, IonSearchbar, IonContent, IonTitle, IonToolbar, IonHeader, CommonModule, FormsModule, RouterModule]
})
export class MapPage implements OnInit {


constructor() {
  addIcons({ personCircleOutline, statsChartOutline, navigateOutline, heartOutline, personOutline, homeOutline });

}





  ngOnInit() {


  }


}


 
