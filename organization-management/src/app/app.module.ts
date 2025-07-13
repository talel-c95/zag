import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Material modules
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// Components
import { EstablishmentsComponent } from './pages/dashboardRH/establishments.component';
import { EditEstablishmentDialogComponent } from './pages/dashboardRH/edit-establishment-dialog.component';
// Service
import { EstablishmentService } from './services/establishment.service';
// Other components (add as needed)
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    EstablishmentsComponent,
    EditEstablishmentDialogComponent
    // ...other components
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [EstablishmentService],
  bootstrap: [AppComponent]
})
export class AppModule {} 