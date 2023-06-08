import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';
import { EventListComponent } from '../../components/event-list/event-list.component';
import { AddEventDialogComponent } from '../../dialogs/add-event-dialog/add-event-dialog.component';
import { GeneralDialogComponent } from '../../dialogs/general-dialog/general-dialog.component';
import { EventService } from '../../services/event.service';
// import { EventItemComponent } from './../../components/event-item/event-item.component';
import { IEvent } from './../../models/data-type';
import { HomepageComponent } from './homepage.component';

const EventList: IEvent[] = [
  {
    id: 'e3',
    title: 'Networking for extroverts',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2022-04-10',
    priority: 'low',
    isCompleted: true,
  },
];

let eventService = EventService,
  dialog = MatDialog;

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    const dialogSpyObj = jest.spyOn(dialog.prototype, 'open').mockReturnValue({
      componentInstance: { confirmCallback: of() },
    } as any);

    await TestBed.configureTestingModule({
      imports: [
        HomepageComponent,
        EventListComponent,
        GeneralDialogComponent,
        AddEventDialogComponent,
        ReactiveFormsModule,
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        FormBuilder,
        { provide: MatDialog, useValue: dialogSpyObj },
        EventService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getEvents on EventService', () => {
    expect(EventService.prototype.getEvents).toHaveBeenCalled();
  });

  it('should open dialog on addEvent', () => {
    component.addEvent();
    expect(MatDialog.prototype.open).toHaveBeenCalled();
  });
});
