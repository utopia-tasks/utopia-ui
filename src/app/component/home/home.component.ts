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
  toDos: Todo[];
  loading: boolean;

  constructor(private toDoService: TodosService) { }

  ngOnInit(): void {
    this.toDos = [];
    this.loading = true;

    this.toDoService.getInitialToDos()
      .pipe( finalize( () => this.loading = false))
      .subscribe(res => {
        this.toDos = res.records;
        this.toDoService.getAdditionalToDos(res.offset).subscribe(result => {
          this.toDos = this.toDos.concat(result.records);
        });
      });
  }
}
