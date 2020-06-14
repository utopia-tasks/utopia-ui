import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Record} from '../../entity/record';
import {finalize} from 'rxjs/internal/operators';
import {TodosService} from '../../service/todos/todos.service';
import {Todo} from '../../entity/todo';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
  startIndex: number;
  starredIndex: number;
  loading: boolean;
  toDos: Todo[];
  startToDo: Todo;

  constructor(private route: ActivatedRoute, private toDoService: TodosService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading = true;
      this.toDos = [];
      this.starredIndex = 0;
      this.startIndex = Number(params.startIndex);
      this.startToDo = new Todo();

      this.toDoService.getToDos('0')
        .pipe( finalize( () => this.loading = false))
        .subscribe(res => {
          this.toDos = res.records;
          this.getMoreTodos(res);
        });
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
      this.starredIndex = this.toDos.map(todo => todo.fields.isStarred).lastIndexOf(true);
      this.startToDo = this.toDos[this.startIndex];
    }
  }

  selectStarred() {
    if (this.startIndex + 1 < this.toDos.length) {
      this.startIndex = this.startIndex + 1;
      this.startToDo = this.toDos[this.startIndex];
    } else {
      this.startToDo = null;
    }
  }

  selectNewStarredToDo() {
    this.starredIndex = this.startIndex;
    this.startToDo.fields.isStarred = true;
    this.toDoService.updateToDos([this.startToDo]).subscribe(res => {});

    this.selectStarred();
  }

  clearAllStars() {
    const tempToDos = this.toDos.filter(todo => todo.fields.isStarred).map(todo => {
      todo.fields.isStarred = false;
      return todo;
    });

    this.toDos = this.toDos.map(todo => {
      todo.fields.isStarred = false;
      return todo;
    });

    this.toDos[0].fields.isStarred = true;
    const index = tempToDos.map(todo => todo.id).indexOf(this.toDos[0].id);
    if (index > -1) {
      tempToDos[index].fields.isStarred = true;
    } else {
      tempToDos.push(this.toDos[0]);
    }
    this.starredIndex = 0;
    this.startIndex = 1;
    this.startToDo = this.toDos[this.startIndex];

    // ACTION: Deal with the cap of ten records
    this.toDoService.updateToDos(tempToDos).subscribe(res => {});
  }

  moveStartIndex(count: number) {
    switch (this.startIndex + count) {
      case -1: {
        break;
      }
      case this.toDos.length: {
        this.startToDo = null;
        break;
      }
      default: {
        this.startIndex = this.startIndex + count;
        this.startToDo = this.toDos[this.startIndex];
        break;
      }
    }
  }
}
