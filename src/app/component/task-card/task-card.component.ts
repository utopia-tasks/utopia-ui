import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../entity/todo';
import {TodosService} from '../../service/todos/todos.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  @Input() toDo: Todo;

  constructor(private toDoService: TodosService) { }

  ngOnInit(): void {
  }

  updateIsCompleted(toDo: Todo, event?: Event) {
    toDo.fields.isCompleted = !toDo.fields.isCompleted;
    toDo.fields.isStarred = false;
    if (event) { event.stopPropagation(); }

    this.toDoService.updateToDos([toDo]).subscribe(res => {});

    if (toDo.fields.repeatingFrequency) {
      const tempToDo = new Todo();
      tempToDo.fields = Object.assign({}, toDo.fields);
      tempToDo.fields.isCompleted = false;

      // ACTION: Handle un-check/re-checking on repeating todods
      let tempDate: string;
      switch (tempToDo.fields.repeatingFrequency) {
        case 'Day': {
          tempDate = new Date(new Date(tempToDo.fields.dueDate).getTime() +
            toDo.fields.repeatingCount * 24 * 60 * 60 * 1000).toISOString();
          break;
        }
        case 'Week': {
          tempDate = new Date(new Date(tempToDo.fields.dueDate).getTime() +
            toDo.fields.repeatingCount * 7 * 24 * 60 * 60 * 1000).toISOString();
          break;
        }
        case 'Month': {
          tempDate = new Date(new Date(tempToDo.fields.dueDate).getTime() +
            toDo.fields.repeatingCount * 30 * 24 * 60 * 60 * 1000).toISOString();
          break;
        }
        default: { break; }
      }

      tempToDo.fields.startDate = tempDate;
      tempToDo.fields.dueDate = tempDate;

      this.toDoService.addToDos([tempToDo]).subscribe(res => { });
    }
  }

}
