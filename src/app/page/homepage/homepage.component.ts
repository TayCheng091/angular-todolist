import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EventListComponent } from 'src/app/components/event-list/event-list.component';
import { AddEventDialogComponent } from 'src/app/dialogs/add-event-dialog/add-event-dialog.component';
import { IEvent } from 'src/app/models/data-type';
import { EventService } from 'src/app/services/event.service';

interface IFilerFrom {
  completed: boolean;
  notCompleted: boolean;
  sortByDateDescending: boolean;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    EventListComponent,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  title = 'to-do-list';

  originEventList: IEvent[] = [];
  filteredEventList: IEvent[] = [];

  filterForm = this.builder.group<IFilerFrom>({
    completed: false,
    notCompleted: false,
    sortByDateDescending: false,
  });

  constructor(
    private dialog: MatDialog,
    private eventService: EventService,
    private builder: FormBuilder
  ) {
    this.eventService.getEvents();
    this.eventService.eventList$.subscribe((eventList) => {
      this.originEventList = JSON.parse(JSON.stringify(eventList));
      this.filteredEventList = JSON.parse(JSON.stringify(eventList));
      this.filterForm.reset();
    });

    this.filterForm.valueChanges.subscribe((filterStatus) => {
      const { completed, notCompleted } = filterStatus;
      this.filteredEventList = JSON.parse(JSON.stringify(this.originEventList));
      if (completed !== notCompleted) {
        if (completed) {
          this.filteredEventList = this.filteredEventList.filter(
            (event) => event.isCompleted === true
          );
        } else if (notCompleted) {
          this.filteredEventList = this.filteredEventList.filter(
            (event) => event.isCompleted === false
          );
        }
      }
      this.sortByDate(!!this.filterForm.value.sortByDateDescending);
    });
  }

  ngOnInit(): void {}

  addEvent() {
    const dialogRef = this.dialog.open(AddEventDialogComponent);

    dialogRef.componentInstance.confirmCallback.subscribe(() => {
      console.log(`add event finished`);
    });
  }

  sortByDate(isDescending: boolean) {
    console.log(`isDescending = `, isDescending);
    this.filteredEventList = this.filteredEventList.sort((a, b) => {
      const dateA = new Date(a.date),
        dateB = new Date(b.date);
      return isDescending
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

    console.log(`filteredEventList = `, this.filteredEventList);
  }
}
