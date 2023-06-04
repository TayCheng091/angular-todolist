import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

export interface IGeneralContent {
  title: string;
  description: string;
  confirmCallBack?: () => {};
}

@Component({
  selector: 'app-general-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.scss'],
})
export class GeneralDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GeneralDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IGeneralContent
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    if (this.data.confirmCallBack) {
      this.data.confirmCallBack();
    }
    this.dialogRef.close();
  }
}
