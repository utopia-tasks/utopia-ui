import { Component, OnInit } from '@angular/core';
import {TodosService} from '../../service/todos/todos.service';
import {finalize} from 'rxjs/internal/operators';
import {Todo} from '../../entity/todo';
import {DatePipe} from '@angular/common';

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
    this.toDoService.getToDos()
      .pipe( finalize( () => this.loading = false))
      .subscribe(res => {
        this.toDos = res.records.filter(toDo => toDo.fields.isStarred === true);
        this.toDos = this.toDos.sort((a, b) => {
          return new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime();
        });
      });
  }

}
