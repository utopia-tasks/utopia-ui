import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../entity/todo';
import {TodosService} from '../../service/todos/todos.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() toDos: Todo[];

  constructor(private toDoService: TodosService) { }

  ngOnInit(): void {
  }

  addToDo(toDoInfo: string) {
    this.toDoService.addToDos([new Todo(toDoInfo)]).subscribe(res => {
      this.toDos = this.toDos.concat(res.records);
    });
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

  updateIsStarred(toDo: Todo, event: Event) {
    toDo.fields.isStarred = !toDo.fields.isStarred;
    event.stopPropagation();

    this.toDoService.updateToDos([toDo]).subscribe(res => {});
  }

}
