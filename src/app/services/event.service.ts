import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEvent } from 'src/app/models/data-type';
import { LocalStorageKey } from './../models/data-type';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  postAddEvent(payload: IEvent): Observable<any> {
    let curEvents = [];
    if (localStorage.getItem(LocalStorageKey)) {
      curEvents = JSON.parse(<string>localStorage.getItem(LocalStorageKey));
    }
    curEvents.push(payload);
    localStorage.setItem(LocalStorageKey, JSON.stringify(curEvents));
    return of(null);
  }
}
