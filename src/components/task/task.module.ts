
// Angular Module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Declarations and Service
import { TaskComponent } from './task.component';
import { TaskService } from 'src/service/task';
// Material UI Module
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    TaskComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    TaskComponent
  ],
  providers: [
    TaskService
  ],
})
export class TaskModule { }