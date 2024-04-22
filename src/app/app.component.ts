import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { IonApp, IonRouterOutlet, IonItem, IonTitle, IonHeader, IonToolbar, IonButton, IonButtons, IonIcon, IonFooter, IonContent } from "@ionic/angular/standalone";
import { HomePage } from './home/home.page';
import { DarkModeService } from './services/dark-mode.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonContent, IonFooter, IonIcon, IonButtons, IonButton, IonToolbar, IonHeader, IonTitle, IonItem, IonRouterOutlet, IonApp, CommonModule, RouterOutlet, RouterLink, HomePage],
})
export class AppComponent implements OnInit{
authService = inject(AuthService)
router = inject(Router);

constructor(public darkModeService: DarkModeService) {
}



// toggleDarkMode() {
//   this.darkModeService.toggleDarkMode();
// }



  ngOnInit(): void {
      this.authService.user$.subscribe(user => {
        if (user) {
          this.authService.currentUser.set({
            email: user.email!,
            username: user.displayName!,
          });
        } else {
          this.authService.currentUser.set(null);
        }
        console.log(this.authService.currentUser())
      });

      
  }





  logout(): void {
   this.authService.logout();
   this.router.navigateByUrl('/login');

  }
}