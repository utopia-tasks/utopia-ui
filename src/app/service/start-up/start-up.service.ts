import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StartUpService {
  readonly startUpUrl = `${environment.apiUrl}/api/v1.0`;

  constructor(private http: HttpClient) { }

  getPing(): Observable<string> {
    return this.http.get<string>(`${this.startUpUrl}/ping`);
  }
}
