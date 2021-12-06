import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUser } from '../../models/interfaces/user-interface';

@Injectable({ providedIn: 'any' })
export class UsersRestService {
  constructor(private readonly _http: HttpClient) { }

  getUsers(): Observable<ApiUser[]> {
    return this._http.get<ApiUser[]>('https://jsonplaceholder.typicode.com/users');
  }
}
