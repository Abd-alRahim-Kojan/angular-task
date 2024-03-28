import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  searchValue: number | null = null;

  constructor(private http: HttpClient) {}

  getAllUsersFromPage(page: number) {
    if (this.searchValue === null) {
      return this.http.get(`${environment.baseApi}/users?page=${page}`);
    } else {
      return this.getUserById(this.searchValue);
    }
  }

  getUserById(id: number) {
    const params = new HttpParams().set('id', id);
    return this.http.get(`${environment.baseApi}/users/`, { params });
  }
}
