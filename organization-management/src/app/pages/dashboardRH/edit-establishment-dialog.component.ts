import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Establishment } from '../../models/establishment.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-establishment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './edit-establishment-dialog.component.html',
  styleUrls: ['./edit-establishment-dialog.component.scss']
})
export class EditEstablishmentDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditEstablishmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Establishment
  ) {
    this.form = this.fb.group({
      establishmentId: [data.establishmentId],
      identification: [data.identification, [Validators.required, Validators.maxLength(50)]],
      name: [data.name, [Validators.required, Validators.maxLength(100)]],
      address: [data.address, [Validators.required, Validators.maxLength(255)]]
    });
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
} 