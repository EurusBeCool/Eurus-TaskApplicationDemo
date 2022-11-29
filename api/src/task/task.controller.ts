import { Controller, Get, Delete, Param, Body, Put, Post } from "@nestjs/common";
import { TaskInterface, CommonInterface } from "../../../shared/interface/index";
import { taskListMockup } from '../../../shared/mockup/task';

@Controller()
export class TaskController {
  mockupData = taskListMockup;

  @Get('/api/tasks')
  async getTaskList(): Promise<CommonInterface.PromiseData>{
    return {
      status: 200,
      data: this.mockupData
    };
  }

  @Delete(`/api/task/:taskId`)
  async deteleTask(@Param('taskId') taskId: number): Promise<CommonInterface.PromiseData>{
    this.mockupData = this.mockupData.filter(item => item.id !== Number(taskId))
    return {
      status: 200,
      data: ""
    };
  }

  @Put(`/api/task/:taskId`)
  async updateTask(@Param('taskId') taskId: number,
    @Body() data: any): Promise<CommonInterface.PromiseData>{
    this.mockupData = this.mockupData.map(item => {
      if(item.id === Number(taskId)){
        return {
          ...item,
          description: data.description
        }
      } else {
        return item;
      }
    })
    return {
      status: 201,
      data: ""
    };
  }

  @Post(`/api/task`)
  async createTask(@Body() data: any): Promise<CommonInterface.PromiseData>{
    let currentLastId: number;
    if (this.mockupData.length > 0) {
      currentLastId = this.mockupData.reduce((x, y) => {
        return x.id > y.id ? x : y
      }).id;
    } else {
      currentLastId = 0;
    }

    const newItem: TaskInterface.TaskItem = {
      id: currentLastId + 1,
      description: data.description
    }
    this.mockupData.push(newItem);

    return {
      status: 200,
      data: ""
    };
  }
}