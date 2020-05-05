import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Record} from '../../entity/record';
import { Observable} from 'rxjs/index';
import {Todo} from '../../entity/todo';


@Injectable()
export class TodosService {
  constructor(private http: HttpClient) { }

  getToDos(): Observable<Record> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer keyzO7sPzMIG0WmZx');
    return this.http.get<Record>('https://api.airtable.com/v0/app9S2ylfAtMmdNC4/Table%201?maxRecords=100&view=Grid%20view', { headers: headers });
  }

  updateToDos(toDos: Todo[]): Observable<Record> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer keyzO7sPzMIG0WmZx')
      .set('Content-Type', 'application/json');

    return this.http.patch<Record>('https://api.airtable.com/v0/app9S2ylfAtMmdNC4/Table%201', this.convertToJSON(toDos), { headers: headers });
  }

  addToDos(toDos: Todo[]): Observable<Record> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer keyzO7sPzMIG0WmZx')
      .set('Content-Type', 'application/json');

    return this.http.post<Record>('https://api.airtable.com/v0/app9S2ylfAtMmdNC4/Table%201', this.convertToJSON(toDos), { headers: headers });
  }

  convertToJSON(toDos: Todo[]): string {
    let body = new Record();
    body.records = [];

    toDos.forEach(toDo => {
      if (toDo.id) {
        body.records.push({
          id: toDo.id,
          fields: toDo.fields
        });
      } else {
        body.records.push({ fields: toDo.fields });
      }

    });

    return JSON.stringify(body);
  }
}
