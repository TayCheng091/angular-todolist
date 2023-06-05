import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { GeneralDialogComponent } from 'src/app/dialogs/general-dialog/general-dialog.component';
import { IEvent } from 'src/app/models/data-type';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatIconModule, MatDialogModule],
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent {
  @Input() eventData!: IEvent;

  constructor(private dialog: MatDialog, private eventService: EventService) {}

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
}
