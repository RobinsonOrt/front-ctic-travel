import { Component } from '@angular/core';
import { DestinationsService } from '../../core/services/destinations/destinations.service';
import { ActivatedRoute } from '@angular/router';
import { PlansService } from '../../core/services/plans/plans.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-destination-plans',
  standalone: true,
  imports: [ErrorMessageComponent, SuccessMessageComponent, NgIf, NgFor],
  templateUrl: './admin-destination-plans.component.html',
  styleUrl: './admin-destination-plans.component.css'
})
export class AdminDestinationPlansComponent {
  constructor(private destinationsService: DestinationsService, private plansService: PlansService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.destinationTag = params['destinationTag'];
      this.getData();
    });
  }
  error: boolean = true;
  message: string = 'Cargando registros...';
  destinationTag: string = '';
  plansToDestination: any[] = [];
  plansByDestination: any[] = [];
  errorToDestination: boolean = false;
  errorByDestination: boolean = false;
  messageToDestination: string = '';
  messageByDestination: string = '';
  localError: boolean = false;
  localMessage: string = '';
  success: boolean = false;

  getData() {
    this.getPlansToDestination();
    this.getPlansByDestination();
  }

  getPlansToDestination() {
    this.plansService.getPlansToDestination(this.destinationTag).subscribe({
      next: (data: any) => {
        this.plansToDestination = data.response;
        if (this.plansToDestination.length === 0) {
          this.errorToDestination = true;
          this.messageToDestination = 'No hay registros para mostrar';
          return;
        }
        this.error = false;
        this.errorToDestination = false;
      },
      error: (error: string) => {
        this.errorToDestination = true;
        this.messageToDestination = error;
      }
    })
  }

  getPlansByDestination() {
    this.plansService.getPlansByDestination(this.destinationTag).subscribe({
      next: (data: any) => {
        this.plansByDestination = data.response;
        if (this.plansByDestination.length === 0) {
          this.errorByDestination = true;
          this.messageByDestination = 'No hay registros para mostrar';
          return;
        }
        this.error = false;
        this.errorByDestination = false;
      },
      error: (error: string) => {
        this.errorByDestination = true;
        this.messageByDestination = error;
      }
    })
  }

  addPlanToDestination(planTag: string) {
    console.log(planTag);
    this.destinationsService.addPlanToDestination(this.destinationTag, planTag).subscribe({
      next: (data: any) => {
        console.log(data);
        this.localMessage = data.response;
        this.success = true;
        this.getData();
      },
      error: (error: string) => {
        this.localError = true;
        this.localMessage = error;
      }
    });
    setTimeout(() => {
      this.localError = false;
      this.success = false;
    }, 3000);
  }

  removePlanFromDestination(planTag: string) {
    this.destinationsService.removePlanFromDestination(this.destinationTag, planTag).subscribe({
      next: (data: any) => {
        this.localMessage = data.response;
        this.success = true;
        this.getData();
      },
      error: (error: string) => {
        this.localError = true;
        this.localMessage = error;
      }
    });
    setTimeout(() => {
      this.localError = false;
      this.success = false;
    }, 3000);
  }

}