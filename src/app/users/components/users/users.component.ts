import { Component } from '@angular/core';
import { UserService } from '../../services/users.service';
import { Users } from '../../models/users';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {
  users: Users | null = null;
  loadedUsers!: any;
  searchValue!: number | null;
  loading: boolean = false;
  currentPage: number = 1;

  public constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers(this.currentPage);
    this.getAllUsersFromAllPages();
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

  public onSearchChange(): void {
    console.log(this.loadedUsers);
    
    // if (this.searchValue) {
    //   this.users = this.loadedUsers.filter(
    //     (user: { id: number | null }) => user.id === this.searchValue
    //   );
    // } else {
    //   this.users = this.loadedUsers;
    // }
  }

  getAllUsersFromAllPages() {
    if (this.searchValue === null) {
      this.userService.getAllUsers().subscribe({
        next: (res) => {
          this.loadedUsers = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
      return this.loadedUsers;
    } else {
      return this.userService.getAllUsers().pipe(
        map((res) => {
          return console.log(res.find((user) => user.id === this.searchValue));
        })
      );
    }
  }
}
