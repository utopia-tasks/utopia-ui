import { Component, OnInit } from '@angular/core';
import {TodosService} from '../../service/todos/todos.service';
import {Todo} from '../../entity/todo';
import {finalize} from 'rxjs/internal/operators';
import {Record} from '../../entity/record';

@Component({
  selector: 'app-deadlines',
  templateUrl: './deadlines.component.html',
  styleUrls: ['./deadlines.component.css']
})
export class DeadlinesComponent implements OnInit {
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
      this.toDos = this.toDos.filter(toDo => toDo.fields.dueDate);
      this.toDos = this.toDos.filter(toDo => toDo.fields.startDate <= new Date().toISOString() || !toDo.fields.startDate);
      this.toDos = this.toDos.sort((a, b) => {
        return new Date(a.fields.dueDate).getTime() - new Date(b.fields.dueDate).getTime();
      });
    }
  }
}

