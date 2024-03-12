import { Component } from '@angular/core';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { NgFor, NgIf } from '@angular/common';
import { PlansService } from '../../core/services/plans/plans.service';
import { ServerResponse } from '../../interfaces/server-response';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-user-destination-plans',
  standalone: true,
  imports: [ErrorMessageComponent, SuccessMessageComponent, NgIf, NgFor],
  templateUrl: './user-destination-plans.component.html',
  styleUrl: './user-destination-plans.component.css'
})
export class UserDestinationPlansComponent {
  constructor(private plansService: PlansService, private route: ActivatedRoute, private usersService: UsersService) {
    this.route.params.subscribe(params => {
      this.destinationTag = params['destinationTag'];
      this.getPlansToUser();
    });
  }
  error: boolean = true;
  localError: boolean = false;
  success: boolean = false;
  message: string = '';
  destinationTag: string = '';
  planDestinations: any = [];

  getPlansToUser() {
    this.plansService.getPlansToUser(this.destinationTag).subscribe({
      next: (data: ServerResponse) => {
        if (data.response.length === 0) {
          this.error = true;
          this.message = 'Este destino no tiene planes disponibles';
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

  setToDestinationPlan(destinationPlanId: string) {
    this.usersService.setToDestinationPlan(destinationPlanId).subscribe({
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
