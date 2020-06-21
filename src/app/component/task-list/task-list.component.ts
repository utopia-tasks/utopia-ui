import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../entity/todo';
import {TodosService} from '../../service/todos/todos.service';
import {AddTaskComponent} from '../add-task/add-task.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() toDos: Todo[];
  today: string;
  nextWeek: string;
  checklist: any[];

  constructor(private toDoService: TodosService, public dialog: MatDialog, private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.today = new Date().toISOString();
    this.nextWeek = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    this.checklist = [];
  }

  updateIsCompleted(toDo: Todo, event?: Event) {
    this.showCompletedSnackBar('Congratulations, you completed a task!', toDo);

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

      this.toDoService.addToDos([tempToDo]).subscribe(res => {
        this.toDos = this.toDos.concat(res.records);
      });
    }
  }

  duplicateToDo(toDo: Todo) {
    this.showCompletedSnackBar('Congratulations, you made progress on a task!', toDo);

    const tempToDo = new Todo();
    toDo.fields.isStarred = false;
    tempToDo.fields = toDo.fields;

    this.toDoService.addToDos([tempToDo]).subscribe(res => {
      this.toDos = this.toDos.concat(res.records);
    });

    toDo.fields.isCompleted = !toDo.fields.isCompleted;
    this.toDoService.updateToDos([toDo]).subscribe(res => {});
  }

  updateIsStarred(toDo: Todo, event: Event) {
    toDo.fields.isStarred = !toDo.fields.isStarred;
    event.stopPropagation();

    this.toDoService.updateToDos([toDo]).subscribe(res => {});
  }

  editToDo(toDo: Todo) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '600px',
      data: toDo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed');
    });
  }

  onOpen(todo: Todo) {
    if (todo.fields.subTasks) {
      const tempChecklist = todo.fields.subTasks.split(',');

      tempChecklist.forEach((item, index) => {
        if (index % 2 === 0) {
          this.checklist.push({
            label: item,
            isChecked: JSON.parse(tempChecklist[index + 1])
          });
        }
      });
    }
  }

  onClose(todo: Todo) {
    let tempChecklist = '';
    this.checklist.forEach(item => {
      if (tempChecklist === '') {
        tempChecklist = `${item.label},${item.isChecked}`;
      } else {
        tempChecklist = `${tempChecklist},${item.label},${item.isChecked}`;

      }
    });

    todo.fields.subTasks = tempChecklist;
    this.checklist = [];
    this.toDoService.updateToDos([todo]).subscribe(res => {});
  }

  showCompletedSnackBar(message: string, toDo: Todo) {
    const snackBarRef = this.snackBar.open(message, 'Dismiss', {
      duration: 7500,
    });

    snackBarRef.onAction().subscribe(() => {
    });
  }
}
