import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  searchValue: number | null = null;
  users: any = [];

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<{ total_pages: number }>(environment.baseApi).pipe(
      switchMap((res) => {
        const requests = Array.from({ length: res.total_pages }, (_, i) =>
          this.http.get<{ data: User[] }>(
            `${environment.baseApi}?page=${i + 1}`
          )
        );
        return forkJoin(requests).pipe(
          map((responses: any[]) =>
            responses.flatMap((response) => response.data)
          ),
          catchError((error) => {
            console.error('Failed to fetch all users:', error);
            return of([]);
          })
        );
      })
    );
  }

  getAllUsersFromPage(page: number) {
    return this.http.get(`${environment.baseApi}/users?page=${page}`);
  }

  getUserById(id: number) {
    // return this.http.get(`${environment.baseApi}/users/${id}`);
    // return this.http.get(`${environment.baseApi}/useres?id=${id}`);
    const params = new HttpParams().set('id', id);
    return this.http.get(`${environment.baseApi}/users/`, { params });
  }

  getAllUsersFromAllPages() {
    if (this.searchValue === null) {
      return this.getAllUsers();
    } else {
      return this.getAllUsers().pipe(
        map((res) => {
          return res.find((user) => user.id === this.searchValue);
        })
      );
    }
  }
}
