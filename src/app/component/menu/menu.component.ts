import { Component, OnInit } from '@angular/core';
import {TodosService} from '../../service/todos/todos.service';
import {Todo} from '../../entity/todo';
import {finalize} from 'rxjs/internal/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  loading: boolean;
  toDos: Todo[];
  toDosStarred: Todo[];

  constructor(private toDoService: TodosService) { }

  ngOnInit(): void {
    this.loading = true;

    this.toDoService.getInitialToDos()
      .pipe( finalize( () => this.loading = false))
      .subscribe(res => {
        this.toDos = res.records;
        this.toDoService.getAdditionalToDos(res.offset).subscribe(result => {
          this.toDos = this.toDos.concat(result.records);
          this.toDosStarred = this.toDos.filter(toDo => toDo.fields.isStarred === true);
        });
      });
  }

}
