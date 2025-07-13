import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirm Task Completion</h2>
    <mat-dialog-content>Are you sure you completed this task?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNo()">No</button>
      <button mat-raised-button color="primary" (click)="onYes()">Yes</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}
  onYes() { this.dialogRef.close(true); }
  onNo() { this.dialogRef.close(false); }
} 