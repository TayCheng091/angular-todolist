import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralDialogComponent } from '../../dialogs/general-dialog/general-dialog.component';

import { EventItemComponent, ToDoEvent } from './event-item.component';

const curEvent = new ToDoEvent(
  'e2',
  'Networking for introverts',
  "Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
  'New Wall Street 5, 98765 New Work',
  '2021-05-30',
  'low',
  false
);

describe('EventItemComponent', () => {
  let component: EventItemComponent;
  let fixture: ComponentFixture<EventItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EventItemComponent,
        GeneralDialogComponent,
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventItemComponent);
    component = fixture.componentInstance;
    component.eventData = {
      id: 'e2',
      title: 'Networking for introverts',
      description:
        "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
      location: 'New Wall Street 5, 98765 New Work',
      date: '2021-05-30',
      priority: 'low',
      isCompleted: false,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
