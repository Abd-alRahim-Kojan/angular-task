import { Component } from '@angular/core';
import { UserService } from '../../users/services/users.service';
import { Users } from '../../users/models/users';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  searchValue: string = '';
  id: number = 0;
  users: any = [];
  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  });

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  searchUser(id: number): void {
    const user = this.users.find((user: { id: number }) => user.id === id);
    if (user) {
      console.log(user);
    } else {
      console.log(`User with id ${id} not found.`);
    }
  }

  onSearchSubmit(): void {
    const id = this.searchForm.value.searchValue;
    if (id) {
      this.searchUser(+id);
      console.log('Searching for user with id: ', id);
    } else {
      console.log('Please enter a valid id.');
    }
  }

  // private getUsers(_currentPage: number): void {
  //   this.userService.getAllUsers(this.currentPage).subscribe({
  //     next: (res) => {
  //       this.users = res as Users;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     },
  //   });
  // }
}
