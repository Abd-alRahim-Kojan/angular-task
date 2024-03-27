import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
  id: number = 0;
  userData: any = {};
  loading: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private userService: UserService
  ) {
    const idParam = this.router.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : 0;
  }

  ngOnInit() {
    this.getUser(this.id);
  }

  getUser(id: number) {
    this.loading = true;
    this.userService.getUserById(id).subscribe({
      next: (res) => {
        this.loading = false;
        this.userData = res;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      },
    });
  }
}
