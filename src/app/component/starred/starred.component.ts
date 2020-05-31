import { Component, OnInit } from '@angular/core';
import {TodosService} from '../../service/todos/todos.service';
import {finalize} from 'rxjs/internal/operators';
import {Todo} from '../../entity/todo';
import {DatePipe} from '@angular/common';
import {Record} from '../../entity/record';

@Component({
  selector: 'app-starred',
  templateUrl: './starred.component.html',
  styleUrls: ['./starred.component.css']
})
export class StarredComponent implements OnInit {
  toDos: Todo[];
  loading: boolean;

  constructor(private toDoService: TodosService) { }

  ngOnInit(): void {
    this.toDos = [];
    this.loading = true;

    // Action: filter at the service level
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
      this.toDos = this.toDos.filter(toDo => toDo.fields.isStarred === true);
      this.toDos = this.toDos.filter(toDo => toDo.fields.startDate <= new Date().toISOString() || !toDo.fields.startDate);
      this.toDos = this.toDos.sort((a, b) => {
        return new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime();
      });
    }
  }
}
