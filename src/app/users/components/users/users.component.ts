import { Component } from '@angular/core';
import { UserService } from '../../services/users.service';
import { Users } from '../../models/users';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {
  users: Users | null = null;
  loading: boolean = false;
  currentPage: number = 1;

  public constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers(this.currentPage);
  }

  private getUsers(_currentPage: number): void {
    this.loading = true;
    this.userService.getAllUsersFromPage(this.currentPage).subscribe({
      next: (res) => {
        this.loading = false;
        this.users = res as Users;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      },
    });
  }

  public handlePageEvent(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.getUsers(this.currentPage);
  }
}
