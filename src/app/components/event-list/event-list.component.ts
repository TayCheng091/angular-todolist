import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IEvent } from 'src/app/models/data-type';
import { EventItemComponent } from '../event-item/event-item.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  standalone: true,
  imports: [EventItemComponent, NgFor],
})
export class EventListComponent {
  @Input() eventList!: IEvent[];

  trackByFn(index: number, item: any) {
    return item.id;
  }
}
