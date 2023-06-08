import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';
import { IEvent } from 'src/app/models/data-type';
import { EventService } from 'src/app/services/event.service';
import { EventListComponent } from '../../components/event-list/event-list.component';
import { AddEventDialogComponent } from '../../dialogs/add-event-dialog/add-event-dialog.component';

interface IFilerFrom {
  completed: boolean;
  notCompleted: boolean;
  sortByDateDescending: boolean;
  keyword: string;
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
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
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
    keyword: '',
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
      console.log(`filterStatus = `, filterStatus);
      const { completed, notCompleted } = filterStatus;
      let filterList = <IEvent[]>(
        JSON.parse(JSON.stringify(this.originEventList))
      );
      if (completed !== notCompleted) {
        if (completed) {
          filterList = filterList.filter((event) => event.isCompleted === true);
        } else if (notCompleted) {
          filterList = filterList.filter(
            (event) => event.isCompleted === false
          );
        }
      }

      // sort date
      filterList = filterList.sort((a, b) => {
        const dateA = new Date(a.date),
          dateB = new Date(b.date);
        return !!this.filterForm.value.sortByDateDescending
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime();
      });

      this.filteredEventList = JSON.parse(JSON.stringify(filterList));
    });

    this.filterForm.controls.keyword.valueChanges
      .pipe(debounceTime(300))
      .subscribe((data) => {
        const keyword = data?.trim().toLowerCase();
        if (keyword) {
          this.filteredEventList = this.filteredEventList.filter((event) => {
            return event.title.toLowerCase().includes(keyword);
          });
        }
      });
  }

  ngOnInit(): void {}

  addEvent() {
    const dialogRef = this.dialog.open(AddEventDialogComponent);

    dialogRef.componentInstance.confirmCallback.subscribe(() => {
      console.log(`add event finished`);
    });
  }
}
