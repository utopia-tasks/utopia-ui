import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../service/todos/todos.service';
import { Todo } from '../../entity/todo';
import { finalize } from 'rxjs/internal/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toDoText: string;
  toDos: Todo[];
  loading: boolean;

  constructor(private toDoService: TodosService) { }

  ngOnInit(): void {
    this.toDos = [];
    this.loading = true;

    this.toDoService.getToDos()
      .pipe( finalize( () => this.loading = false))
      .subscribe(res => this.toDos = res.records );
  }

  addToDo(toDoInfo: string) {
    this.toDoService.addToDos([new Todo(toDoInfo)]).subscribe(res => {
      this.toDos = this.toDos.concat(res.records);
      this.toDoText = '';
    });
  }
}
