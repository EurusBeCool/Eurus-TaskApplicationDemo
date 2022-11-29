import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogComponent } from './task-dialog.component';
import { TaskModule } from '../task/task.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskInterface } from 'shared/interface';
import { FormBuilder } from '@angular/forms';

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDialogComponent ],
      imports: [ TaskModule ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {
          close: () => { }
        }},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeDialog correctly', () => {
    let spy = spyOn((component as any).dialogRef, 'close');
    component.closeDialog();
    expect(spy).toHaveBeenCalled();
  })

  it('should call confirmTask correctly', () => {
    let spy = spyOn((component as any).dialogRef, 'close');

    component.type = TaskInterface.DialogType.CONTENT_TEXT;
    component.confirmTask();
    expect(spy).toHaveBeenCalled();

    component.type = TaskInterface.DialogType.CONTENT_FORM;
    component.form.patchValue({
      description: "task..."
    })
    component.confirmTask();
    expect(spy).toHaveBeenCalled();
  })
});
