import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../../entity/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly userUrl = `${environment.apiUrl}/api/v1.0/user`;

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.userUrl}`, user, {responseType: 'text', observe: 'response'});
  }
}
