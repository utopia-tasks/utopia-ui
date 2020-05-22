import { Component, OnInit } from '@angular/core';
import {TodosService} from '../../service/todos/todos.service';
import {Todo} from '../../entity/todo';
import {finalize} from 'rxjs/internal/operators';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {
  toDos: Todo[];
  loading: boolean;

  constructor(private toDoService: TodosService) { }

  ngOnInit(): void {
    this.toDos = [];
    this.loading = true;

    // Action: filter at the service level
    this.toDoService.getInitialToDos()
      .subscribe(res => {
        this.toDos = res.records;
        this.toDoService.getAdditionalToDos(res.offset)
          .pipe( finalize( () => this.loading = false))
          .subscribe(result => {
            this.toDos = this.toDos.concat(result.records);
            this.toDos = this.toDos.filter(toDo => toDo.fields.startDate > new Date().toISOString());
            this.toDos = this.toDos.sort((a, b) => {
              return new Date(a.fields.startDate).getTime() - new Date(b.fields.startDate).getTime();
            });
          });
      });
  }
}
