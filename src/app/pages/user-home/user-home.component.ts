import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  constructor(private usersService: UsersService) { }

  logOut() {
    this.usersService.logOut();
  }
}