import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EventListComponent } from './components/event-list/event-list.component';
import { AddEventDialogComponent } from './dialogs/add-event-dialog/add-event-dialog.component';
import { IEvent, LocalStorageKey } from './models/data-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [EventListComponent, MatDialogModule, MatButtonModule],
})
export class AppComponent implements OnInit {
  title = 'to-do-list';

  eventListStr: string | null;
  eventList: IEvent[] = [];

  constructor(private dialog: MatDialog) {
    this.eventListStr = localStorage.getItem(LocalStorageKey);
    if (this.eventListStr) {
      this.eventList = JSON.parse(this.eventListStr);
    }
  }

  ngOnInit(): void {}

  addEvent() {
    const dialogRef = this.dialog.open(AddEventDialogComponent);

    dialogRef.componentInstance.confirmCallback.subscribe(() => {
      console.log(`add event finished`);
    });
  }
}
