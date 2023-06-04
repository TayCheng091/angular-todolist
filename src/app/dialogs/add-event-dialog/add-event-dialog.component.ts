import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-event-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss'],
})
export class AddEventDialogComponent {}
