import { Component } from '@angular/core';
import { EventItemComponent } from '../event-item/event-item.component';
import { DUMMY_EVENTS } from 'dummy-data';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  standalone: true,
  imports: [EventItemComponent, NgFor],
})
export class EventListComponent {
  eventList = DUMMY_EVENTS;
}
