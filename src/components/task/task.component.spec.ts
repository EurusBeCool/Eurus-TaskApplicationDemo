import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { TaskModule } from './task.module';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { taskLabels } from 'src/labels/index';
import { MatDialog } from '@angular/material/dialog';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let labels = taskLabels;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      imports: [ 
        TaskModule,
        HttpClientModule,
      ],
      providers: [
        { provide: MatDialog, useValue: {
          open: () => {},
        }},
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call a API to get intial data', () => {
    let spy = spyOn((component as any).taskService, 'loadTaskList').and.returnValue(of({
      status: 200,
      data: [
        {
          id: 1,
          description: 'text...'
        }
      ]
    }));
    component.loadTaskList();
    expect(spy).toHaveBeenCalled();
  })

  it('should call createTask correctly', () => {
    let spyDialog = spyOn((component as any).dialog, 'open').and
                      .returnValue({afterClosed: () => {
                        return { subscribe: () => {}}
                      }})
    component.createTask();
    expect(spyDialog).toHaveBeenCalled();
  })

  it('should call deleteTask correctly', () => {
    let spy = spyOn((component as any).dialog, 'open')
                .and
                .returnValue({afterClosed: () => {
                  return { subscribe: () => {}}
                }})
    component.deleteTask({
      id: 1,
      description: "text..."
    });
    expect(spy).toHaveBeenCalled();
  })

  it('should call updateTask correctly', () => {
    let spy = spyOn((component as any).dialog, 'open')
                .and
                .returnValue({afterClosed: () => {
                  return { subscribe: () => {}}
                }})
    component.updateTask({
      id: 1,
      description: "text..."
    });
    expect(spy).toHaveBeenCalled();
  })

});
