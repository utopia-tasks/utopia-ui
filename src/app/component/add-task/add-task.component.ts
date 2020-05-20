import {Component, Inject, OnInit} from '@angular/core';
import {TodosService} from '../../service/todos/todos.service';
import {Todo} from '../../entity/todo';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  toDo: Todo;

  constructor(private toDoService: TodosService, @Inject(MAT_DIALOG_DATA) public data: Todo) {}

  ngOnInit(): void {
    this.toDo = this.data;
  }

  addToDo() {
    if (this.toDo.id) {
      this.toDoService.updateToDos([this.toDo]).subscribe(res => { });
    } else {
      this.toDoService.addToDos([this.toDo]).subscribe(res => {
        // this.toDos = this.toDos.concat(res.records);
        this.toDo = new Todo('');
      });
    }
  }
}
