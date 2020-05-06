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
    this.displayToDos();
  }

  addToDo(toDoInfo: string) {
    this.toDoService.addToDos([new Todo(toDoInfo)]).subscribe(res => {
      this.toDos = this.toDos.concat(res.records);
      this.toDoText = '';
    });
  }

  displayToDos() {
    this.toDoService.getToDos()
      .pipe( finalize( () => this.loading = false))
      .subscribe(res => this.toDos = res.records );
  }

  updateIsStarred(toDo: Todo, event: Event) {
    toDo.fields.isStarred = !toDo.fields.isStarred;
    event.stopPropagation();

    this.toDoService.updateToDos([toDo]).subscribe(res => {});
  }

  updateIsCompleted(toDo: Todo, event?: Event) {
    toDo.fields.isCompleted = !toDo.fields.isCompleted;
    toDo.fields.isStarred = false;
    if (event) { event.stopPropagation(); }

    this.toDoService.updateToDos([toDo]).subscribe(res => {});
  }

  duplicateToDo(toDo: Todo) {
    this.addToDo(toDo.fields.Title);
    this.updateIsCompleted(toDo);
  }
}
