import { Component, OnInit } from '@angular/core';
import { CommonInterface, TaskInterface } from '../../../shared/interface';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskService } from 'src/service/task';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { taskLabels } from 'src/labels/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'task-component',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  labels: CommonInterface.Label = taskLabels;

  displayedColumns= ["id", "description", "delete", "update"];

  taskList: TaskInterface.TaskItem[] = [];

  constructor(private taskService: TaskService, private dialog: MatDialog){
  }

  ngOnInit(): void {
    // fetch task list data
    this.loadTaskList();
  }

  loadTaskList() {
    this.taskService.loadTaskList().subscribe((res: any) => {
      if(res?.status === 200){
        this.taskList = res?.data;
      }
    });
  }

  createDialogConfigData(action: string, description?: string) {
    const dialogConfig = new MatDialogConfig();
    if(action === 'delete') {
      dialogConfig.data = {
        title: this.labels['deleteDialogTitle'],
        type: TaskInterface.DialogType.CONTENT_TEXT
      }
    } else if(action === 'create') {
      dialogConfig.data = {
        title: this.labels['createDialogTitle'],
        type: TaskInterface.DialogType.CONTENT_FORM
      }
    } else if(action === 'update') {
      dialogConfig.data = {
        title: this.labels['updateDialogTitle'],
        type: TaskInterface.DialogType.CONTENT_FORM,
        description: description
      }
    }
    return dialogConfig;
  }

  createTask() {
    const config = this.createDialogConfigData('create')
    const dialogRef = this.dialog.open(TaskDialogComponent, config);
    dialogRef.afterClosed().subscribe((form: {description: string}) => {
      this.taskService.createTask(form.description).subscribe((res: any) => {
        if(res?.status === 200){
          this.loadTaskList()
        }
      });
    })
  }

  deleteTask(taskItem: TaskInterface.TaskItem) {
    const config = this.createDialogConfigData('delete')
    const dialogRef = this.dialog.open(TaskDialogComponent, config);
    dialogRef.afterClosed().subscribe(() => {
      this.taskService.deleteTask(taskItem.id).subscribe((res: any) => {
        if(res?.status === 200){
          this.loadTaskList()
        }
      });
    })
  }

  updateTask(taskItem: TaskInterface.TaskItem) {
    const config = this.createDialogConfigData('update', taskItem.description)
    const dialogRef = this.dialog.open(TaskDialogComponent, config);
    dialogRef.afterClosed().subscribe((form: {description: string}) => {
      this.taskService.updateTask({
        id: taskItem.id,
        description: form.description
      }).subscribe((res: any) => {
        if(res?.status === 201){
          this.loadTaskList()
        }
      });
    })
  }
}
