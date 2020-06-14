import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../entity/todo';
import {TodosService} from '../../service/todos/todos.service';
import {AddTaskComponent} from '../add-task/add-task.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  @Input() toDo: Todo;
  today: string;
  nextWeek: string;

  constructor(private toDoService: TodosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.today = new Date().toISOString();
    this.nextWeek = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
  }

  updateIsCompleted(toDo: Todo, event?: Event) {
    toDo.fields.isCompleted = !toDo.fields.isCompleted;
    toDo.fields.isStarred = false;
    if (event) { event.stopPropagation(); }

    this.toDoService.updateToDos([toDo]).subscribe(res => {});

    if (toDo.fields.repeatingFrequency) {
      const tempToDo = new Todo();
      tempToDo.fields = Object.assign({}, toDo.fields);
      tempToDo.fields.isCompleted = false;

      // ACTION: Handle un-check/re-checking on repeating todods
      let tempDate: string;
      switch (tempToDo.fields.repeatingFrequency) {
        case 'Day': {
          tempDate = new Date(new Date(tempToDo.fields.dueDate).getTime() +
            toDo.fields.repeatingCount * 24 * 60 * 60 * 1000).toISOString();
          break;
        }
        case 'Week': {
          tempDate = new Date(new Date(tempToDo.fields.dueDate).getTime() +
            toDo.fields.repeatingCount * 7 * 24 * 60 * 60 * 1000).toISOString();
          break;
        }
        case 'Month': {
          tempDate = new Date(new Date(tempToDo.fields.dueDate).getTime() +
            toDo.fields.repeatingCount * 30 * 24 * 60 * 60 * 1000).toISOString();
          break;
        }
        default: { break; }
      }

      tempToDo.fields.startDate = tempDate;
      tempToDo.fields.dueDate = tempDate;

      this.toDoService.addToDos([tempToDo]).subscribe(res => { });
    }
  }

  editToDo(task: Todo) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '600px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed');
    });
  }

  duplicateToDo(task: Todo) {
    const tempToDo = new Todo();
    task.fields.isStarred = false;
    tempToDo.fields = task.fields;

    this.toDoService.addToDos([tempToDo]).subscribe(res => {});

    task.fields.isCompleted = !task.fields.isCompleted;
    this.toDoService.updateToDos([task]).subscribe(res => {});
  }
}
