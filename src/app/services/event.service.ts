import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IEvent } from 'src/app/models/data-type';
import { LocalStorageKey } from './../models/data-type';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  eventList$ = new BehaviorSubject<IEvent[]>([]);
  eventList: IEvent[] = [];

  constructor() {
    this.eventList$.subscribe((data) => {
      this.eventList = data;
    });
  }

  ngOnDestroy(): void {
    this.eventList$.complete();
  }

  getEvents(): IEvent[] {
    let curEvents = [];
    if (localStorage.getItem(LocalStorageKey)) {
      curEvents = JSON.parse(<string>localStorage.getItem(LocalStorageKey));
    }
    this.eventList$.next(curEvents);
    return curEvents;
  }

  postAddEvent(payload: IEvent): Observable<any> {
    let curEvents = <IEvent[]>JSON.parse(JSON.stringify(this.eventList));
    curEvents.push(payload);
    localStorage.setItem(LocalStorageKey, JSON.stringify(curEvents));
    this.eventList$.next(curEvents);
    return of(null);
  }

  patchEvent(payload: IEvent): Observable<any> {
    let curEvents = <IEvent[]>JSON.parse(JSON.stringify(this.eventList));
    let targetEventIdx = curEvents.findIndex(
      (event) => event.id === payload.id
    );
    curEvents[targetEventIdx] = { ...payload };

    localStorage.setItem(LocalStorageKey, JSON.stringify(curEvents));
    this.eventList$.next(curEvents);
    return of(null);
  }

  deleteEvent(id: string): Observable<any> {
    let curEvents = <IEvent[]>JSON.parse(JSON.stringify(this.eventList));
    curEvents = curEvents.filter((event) => event.id !== id);
    localStorage.setItem(LocalStorageKey, JSON.stringify(curEvents));
    this.eventList$.next(curEvents);
    return of(null);
  }
}
