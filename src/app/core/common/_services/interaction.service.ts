import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  currentView:boolean = true;
  viewSideNaviSource = new BehaviorSubject(this.currentView);

  constructor() { }

  toggleSideNavi() {
    this.currentView = !this.currentView;
    this.viewSideNaviSource.next(this.currentView);
  }


}
