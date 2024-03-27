import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(page: number) {
    return this.http.get(`https://reqres.in/api/users?page=${page}`);
  }

  getUser(id: number) {
    return this.http.get(`https://reqres.in/api/users/${id}`);
  }
}
