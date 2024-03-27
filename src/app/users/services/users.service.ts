import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
    return this.http.get(`${environment.baseApi}?page=${page}`);
  }

  getUserById(id: number) {
    return this.http.get(`${environment.baseApi}/${id}`);
  }
}
