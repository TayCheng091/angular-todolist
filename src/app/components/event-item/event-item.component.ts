import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IEvent } from 'src/app/models/data-type';
import { GeneralDialogComponent } from '../../dialogs/general-dialog/general-dialog.component';
import { EventService } from '../../services/event.service';
import { PriorityImg, TPriority } from './../../models/data-type';

@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    TextFieldModule,
    MatRippleModule,
  ],
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent {
  @Input() eventData!: IEvent;
  @ViewChild('editDescInput', { static: false }) editDescInput!: ElementRef;
  isEdit: boolean = false;
  curEvent: any;
  priorityImgObj = PriorityImg;

  constructor(private dialog: MatDialog, private eventService: EventService) {}

  toggleEventComplete() {
    const { id, title, description, date, location, priority, isCompleted } =
      this.eventData;
    this.curEvent = new ToDoEvent(
      id,
      title,
      description,
      date,
      location,
      priority,
      !isCompleted
    );

    this.eventService.patchEvent({ ...this.curEvent });
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      data: {
        title: 'Delete event',
        description: 'Are you sure you want to delete this event?',
        confirmCallBack: () => {
          this.eventService.deleteEvent(id).subscribe(() => {
            console.log('delete success');
          });
        },
      },
    });
  }

  toggleEdit(type: 'edit' | 'save' | 'cancel'): void {
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      const { id, title, description, date, location, priority, isCompleted } =
        this.eventData;
      this.curEvent = new ToDoEvent(
        id,
        title,
        description,
        date,
        location,
        priority,
        isCompleted
      );

      setTimeout(() => {
        this.editDescInput.nativeElement.focus();
      });
    } else {
      if (type === 'cancel') {
        return;
      }
      this.eventService.patchEvent({ ...this.curEvent });
    }
  }
}

export class ToDoEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  priority: TPriority;
  isCompleted: boolean;
  constructor(
    id: string,
    title: string,
    description: string,
    date: string,
    location: string,
    priority: TPriority,
    isCompleted: boolean
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.location = location;
    this.priority = priority;
    this.isCompleted = isCompleted;
  }
}
