import { Component } from '@angular/core';
import { UserService } from '../../services/users.service';
import { Users } from '../../models/users';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {
  users: Users | null = null;
  searchValue!: number | null;
  loading: boolean = false;
  currentPage: number = 1;

  public constructor(
    private userService: UserService,
    private router: Router
  ) {}

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

  checkUser(id: number): void {
    const user = this.users?.data.find(
      (user: { id: number }) => user.id === id
    );
    if (user) {
      const intervalId = setInterval(() => {
        this.router.navigate(['/user-details', this.searchValue]);
        clearInterval(intervalId);
      }, 1000);
    } else {
      console.log(`User with id ${id} not found`);
    }
  }

  public onSearchChange(): void {
    if (this.searchValue === null) {
      this.getUsers(this.currentPage);
    } else {
      this.checkUser(this.searchValue);
    }
  }
}
