import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../entity/todo';
import {TodosService} from '../../service/todos/todos.service';
import {AddTaskComponent} from '../add-task/add-task.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() toDos: Todo[];
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
  }

  duplicateToDo(toDo: Todo) {
    const tempToDo = new Todo();
    toDo.fields.isStarred = false;
    tempToDo.fields = toDo.fields;

    this.toDoService.addToDos([tempToDo]).subscribe(res => {
      this.toDos = this.toDos.concat(res.records);
    });
    this.updateIsCompleted(toDo);
  }

  updateIsStarred(toDo: Todo, event: Event) {
    toDo.fields.isStarred = !toDo.fields.isStarred;
    event.stopPropagation();

    this.toDoService.updateToDos([toDo]).subscribe(res => {});
  }

  editToDo(toDo: Todo) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '600px',
      data: toDo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
