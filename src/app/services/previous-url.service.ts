import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, Observable, filter, pairwise } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviousUrlService {

  private previousUrl?: string = undefined;
  private currentUrl?: string = undefined;

  constructor(public router : Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  public getPreviousUrl(){
    return this.previousUrl;
  }    
}
