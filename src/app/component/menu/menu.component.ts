import {Component, Inject, OnInit} from '@angular/core';
import {TodosService} from '../../service/todos/todos.service';
import {Todo} from '../../entity/todo';
import {finalize} from 'rxjs/internal/operators';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {AddTaskComponent} from '../add-task/add-task.component';
import {Record} from '../../entity/record';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  loading: boolean;
  toDos: Todo[];
  toDosStarred: Todo[];
  toDosDeadlines: Todo[];
  toDosUpcoming: Todo[];

  constructor(private toDoService: TodosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loading = true;
    this.toDos = [];
    this.toDosStarred = [];
    this.toDosDeadlines = [];
    this.toDosUpcoming = [];

    this.toDoService.getToDos('0')
      .pipe( finalize( () => this.loading = false))
      .subscribe(res => {
        this.toDos = res.records;
        this.getMoreTodos(res);
      });
  }

  getMoreTodos(record: Record) {
    if (record.offset) {
      this.toDoService.getToDos(record.offset)
        .subscribe(res => {
          this.toDos = this.toDos.concat(res.records);
          this.getMoreTodos(res);
        });
    } else {
      this.toDosStarred = this.toDos.filter(toDo => toDo.fields.isStarred === true &&
        (toDo.fields.startDate <= new Date().toISOString() || !toDo.fields.startDate));
      this.toDosDeadlines = this.toDos.filter(toDo => toDo.fields.dueDate && (toDo.fields.startDate <= new Date().toISOString()
        || !toDo.fields.startDate));
      this.toDosUpcoming = this.toDos.filter(toDo => toDo.fields.startDate > new Date().toISOString());
    }
  }

  openAddToDo() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '600px',
      data: new Todo('')
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
