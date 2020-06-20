import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../service/todos/todos.service';
import { Todo } from '../../entity/todo';
import { finalize } from 'rxjs/internal/operators';
import {Record} from '../../entity/record';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toDos: Todo[];
  loading: boolean;

  constructor(private toDoService: TodosService) { }

  ngOnInit(): void {
    this.toDos = [];
    this.loading = true;

    this.toDoService.getToDos('0')
      .pipe( finalize( () => this.loading = false))
      .subscribe(res => {
        this.toDoService.getPing().subscribe(res2 => {
          console.log(res2);
        });

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
