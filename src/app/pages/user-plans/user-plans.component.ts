import { Component } from '@angular/core';
import { PlansService } from '../../core/services/plans/plans.service';
import { UsersService } from '../../core/services/users/users.service';
import { ServerResponse } from '../../interfaces/server-response';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user-plans',
  standalone: true,
  imports: [ErrorMessageComponent, SuccessMessageComponent, NgFor],
  templateUrl: './user-plans.component.html',
  styleUrl: './user-plans.component.css'
})
export class UserPlansComponent {
  constructor(private plansService: PlansService, private usersService: UsersService) {
    this.getPlansToUser();
  }
  error: boolean = true;
  localError: boolean = false;
  success: boolean = false;
  message: string = '';
  destinationTag: string = '';
  planDestinations: any = [];

  getPlansToUser() {
    this.plansService.getPlansByUser().subscribe({
      next: (data: ServerResponse) => {
        if (data.response.length === 0) {
          this.error = true;
          this.message = 'No estas suscrito a ningun plan';
          return;
        }
        this.error = data.error;
        this.planDestinations = data.response;
      },
      error: (error: string) => {
        this.error = true;
        this.message = error;
      }
    });
  }

  removeFromDestinationPlan(destinationPlanId: string) {
    this.usersService.removeFromDestinationPlan(destinationPlanId).subscribe({
      next: (data: ServerResponse) => {
        this.localError = data.error;
        this.message = data.response;
        this.success = true;
        this.getPlansToUser();
      },
      error: (error: string) => {
        this.localError = true;
        this.message = error;
        
      }
    });
    setTimeout(() => {
      this.success = false;
      this.localError = false;
    }, 3000);
  }
}
