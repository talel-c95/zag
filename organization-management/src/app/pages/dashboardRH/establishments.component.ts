import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EstablishmentService } from '../../services/establishment.service';
import { Establishment } from '../../models/establishment.model';
import { EditEstablishmentDialogComponent } from './edit-establishment-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-establishments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    EditEstablishmentDialogComponent
  ],
  templateUrl: './establishments.component.html',
  styleUrls: ['./establishments.component.scss']
})
export class EstablishmentsComponent implements OnInit {
  establishments: Establishment[] = [];
  displayedColumns: string[] = ['identification', 'name', 'address', 'actions'];
  isLoading = true;
  error: string | null = null;

  constructor(private establishmentService: EstablishmentService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchEstablishments();
  }

  fetchEstablishments(): void {
    this.isLoading = true;
    this.establishmentService.getEstablishments().subscribe({
      next: (data) => {
        this.establishments = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load establishments.';
        this.isLoading = false;
      }
    });
  }

  openEditDialog(establishment: Establishment): void {
    const dialogRef = this.dialog.open(EditEstablishmentDialogComponent, {
      width: '400px',
      data: { ...establishment }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.establishmentService.updateEstablishment(result.establishmentId, result).subscribe({
          next: () => this.fetchEstablishments(),
          error: () => this.error = 'Failed to update establishment.'
        });
      }
    });
  }
} 