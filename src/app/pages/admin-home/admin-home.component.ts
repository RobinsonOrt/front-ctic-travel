import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  constructor(private usersService: UsersService) { }
  logOut() {
    this.usersService.logOut();
  }
}
