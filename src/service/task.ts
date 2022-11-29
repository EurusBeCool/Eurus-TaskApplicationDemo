import { Injectable } from "@angular/core";
import { TaskInterface, CommonInterface } from 'shared/interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient){}

  loadTaskList(){
    return this.http.get("/api/tasks");
  }

  createTask(description: string){
    return this.http.post(`/api/task`, {description: description});
  }

  deleteTask(id: number){
    return this.http.delete(`/api/task/${id}`);
  }

  updateTask(taskItem: TaskInterface.TaskItem){
    return this.http.put(`/api/task/${taskItem.id}`, {description: taskItem.description})
  }
}