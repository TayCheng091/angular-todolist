import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import {
  DateAdapter,
  MatNativeDateModule,
  MatOptionModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IEvent } from 'src/app/models/data-type';
import { v4 as uuidv4 } from 'uuid';
import { EventService } from '../../services/event.service';
import { PriorityList } from './../../models/data-type';

interface IEventForm {
  title: FormControl<string | null>;
  description?: FormControl<string | null>;
  location?: FormControl<string | null>;
  date: FormControl<string | null>;
  priority?: FormControl<string | null>;
}

const DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-event-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss'],
})
export class AddEventDialogComponent implements OnInit {
  @Output() confirmCallback: EventEmitter<void> = new EventEmitter();

  eventForm: FormGroup = new FormGroup<IEventForm>({
    title: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null),
    location: new FormControl<string | null>(null),
    date: new FormControl<string | null>(null, [Validators.required]),
    priority: new FormControl<'high' | 'low' | null>('low'),
  });

  priorityOptions = Object.values(PriorityList);

  minDate = new Date();

  constructor(
    private dialogRef: MatDialogRef<AddEventDialogComponent>,
    private eventService: EventService
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }

  addEvent() {
    console.log(`eventForm = `, this.eventForm);
    if (this.eventForm.invalid) return;

    const payload: IEvent = {
      id: uuidv4(),
      ...this.eventForm.value,
      isCompleted: false,
    };

    this.eventService.postAddEvent(payload).subscribe(() => {
      this.confirmCallback.emit();
      this.dialogRef.close();
    });
  }
}
