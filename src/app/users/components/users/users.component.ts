import { Component } from '@angular/core';
import { UserService } from '../../services/users.service';
import { Users } from '../../models/users';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {
  users: any = [];
  per_page: number = 6;
  searchValue!: number | null;
  loading: boolean = false;
  currentPage: number = 1;

  public constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers(this.currentPage);
  }

  private getUsers(currentPage: number, per_page: number = 6): void {
    this.loading = true;
    this.userService.getAllUsersFromPage(this.currentPage, per_page).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.users = res.data;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error getting users', err);
      },
    });
  }

  public handlePageEvent(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.per_page = event.pageSize;
    this.getUsers(this.currentPage, this.per_page);
  }

  checkUser(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (res: any) => {
        this.users = [res.data];
      },
      error: (err) => {
        console.error(err);
        this.users = []
      },
    });
  }

  public onSearchChange(): void {
    if (this.searchValue === null) {
      this.getUsers(this.currentPage);
    } else {
      this.checkUser(this.searchValue);
    }
  }
}
