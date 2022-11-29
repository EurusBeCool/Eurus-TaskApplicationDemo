import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskInterface, CommonInterface } from 'shared/interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { taskLabels } from 'src/labels/index';

@Component({
  selector: 'task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {
  title: string;
  form: FormGroup;
  labels: CommonInterface.Label = taskLabels;
  type: TaskInterface.DialogType;

  constructor(@Inject(MAT_DIALOG_DATA) dislogData: TaskInterface.TaskDialog, private fb: FormBuilder, private dialogRef: MatDialogRef<TaskDialogComponent>){
    this.title = dislogData.title;
    this.type = dislogData.type;

    this.form = fb.group({
      description: [dislogData.description ? dislogData.description : "", Validators.required]
    })
  }

  closeDialog() {
    this.dialogRef.close({ type: 'cancel' });
  }

  confirmTask() {
    if (this.type === TaskInterface.DialogType.CONTENT_TEXT) {
      // Inform parent component to delete this task
      this.dialogRef.close({ type: 'confirm' });
    } else {
      // Inform parent component to create or update this task
      if(this.form.valid) {
        this.dialogRef.close({ type: 'confirm', description: this.form.value.description });
      }
    }
  }
}
