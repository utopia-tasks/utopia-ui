import { Component, OnInit } from '@angular/core';
import {Todo} from '../../entity/todo';
import {TodosService} from '../../service/todos/todos.service';
import {finalize} from 'rxjs/internal/operators';
import {Record} from '../../entity/record';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  toDos: Todo[];
  loading: boolean;

  constructor(private toDoService: TodosService) { }

  ngOnInit(): void {
    this.toDos = [];
    this.loading = true;

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
      this.toDos = this.toDos.filter(toDo => toDo.fields.startDate <= new Date().toISOString() || !toDo.fields.startDate);
    }
  }
}
