import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
  })
export class DataService {

    private messageSource = new BehaviorSubject('default message');
    currentMessage = this.messageSource.asObservable();

  private viewSource = new BehaviorSubject(false);
  currentView = this.viewSource.asObservable();


  constructor(http: HttpService) { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeView(message: boolean) {
    this.viewSource.next(message);
  }
}
