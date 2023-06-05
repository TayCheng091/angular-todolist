import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEvent } from 'src/app/models/data-type';
import { LocalStorageKey } from './../models/data-type';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  getEvents(): IEvent[] {
    let curEvents = [];
    if (localStorage.getItem(LocalStorageKey)) {
      curEvents = JSON.parse(<string>localStorage.getItem(LocalStorageKey));
    }
    return curEvents;
  }

  postAddEvent(payload: IEvent): Observable<any> {
    let curEvents = this.getEvents();
    curEvents.push(payload);
    localStorage.setItem(LocalStorageKey, JSON.stringify(curEvents));
    return of(null);
  }

  deleteEvent(id: string): Observable<any> {
    let curEvents = this.getEvents();
    curEvents = curEvents.filter((event) => event.id !== id);
    localStorage.setItem(LocalStorageKey, JSON.stringify(curEvents));
    return of(null);
  }
}
