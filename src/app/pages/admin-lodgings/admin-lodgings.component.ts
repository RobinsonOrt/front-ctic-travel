import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DestinationsService } from '../../core/services/destinations/destinations.service';
import { ServerResponse } from '../../interfaces/server-response';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { LodgingsService } from '../../core/services/lodgings/lodgings.service';

@Component({
  selector: 'app-admin-lodgings',
  standalone: true,
  imports: [RouterModule, NgFor, ErrorMessageComponent, SuccessMessageComponent],
  templateUrl: './admin-lodgings.component.html',
  styleUrl: './admin-lodgings.component.css'
})
export class AdminLodgingsComponent {
  constructor(private destinationsService: DestinationsService, private lodgingsService: LodgingsService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.destinationTag = params['destinationTag'];
      this.getDestinationByTag();
    });
  }
  error: boolean = true;
  message: string = 'Cargando registros...';
  localError: boolean = false;
  success: boolean = false;
  destinationTag: string = '';
  destination: any = {};
  lodgings: any = [];

  getDestinationByTag() {
    this.destinationsService.getByDestinationTag(this.destinationTag).subscribe({
      next: (data: ServerResponse) => {
        this.destination = data.response;
        this.lodgings = this.destination.lodgings;
        if (this.lodgings.length === 0) {
          this.error = true;
          this.message = 'No hay registros para mostrar';
          return;
        }
        this.error = false;
      },
      error: (error: string) => {
        this.error = true;
        this.message = error;
      }
    })
  }

  deleteLodging(id: string) {
    this.lodgingsService.deleteLodging(id).subscribe({
      next: (data: ServerResponse) => {
        this.localError = data.error;
        this.message = data.response;
        this.success = true;
        this.getDestinationByTag();
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
