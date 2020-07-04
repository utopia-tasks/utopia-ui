import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record } from '../../entity/record';
import { Observable, of } from 'rxjs/index';
import { Todo } from '../../entity/todo';

@Injectable()
export class TodosService {
  toDos: Todo[];

  constructor(private http: HttpClient) {
  }

  getToDos(offset: string): Observable<Record> {
    return of(new Record());
  }

  updateToDos(toDos: Todo[]): Observable<Record> {
    return of(new Record());
  }

  addToDos(toDos: Todo[]): Observable<Record> {
    return of(new Record());
  }

  convertToJSON(toDos: Todo[]): string {
    const body = new Record();
    body.records = [];

    toDos.forEach(toDo => {
      if (toDo.id) {
        body.records.push({
          id: toDo.id,
          fields: toDo.fields
        });
      } else {
        body.records.push({fields: toDo.fields});
      }
    });

    return JSON.stringify(body);
  }
}
