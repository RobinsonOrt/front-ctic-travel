import { Component } from '@angular/core';
import { DestinationsService } from '../../core/services/destinations/destinations.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ServerResponse } from '../../interfaces/server-response';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-destination',
  standalone: true,
  imports: [ErrorMessageComponent, NgIf, NgFor, RouterModule],
  templateUrl: './user-destination.component.html',
  styleUrl: './user-destination.component.css'
})
export class UserDestinationComponent {
  constructor(private destinationsService: DestinationsService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.destinationTag = params['destinationTag'];
      this.getDestinationByTag();
    });
  }
  error: boolean = true;
  message: string = 'Cargando registros...';
  destinationTag: string = '';
  destination: any = {};
  lodgings: any = [];
  lodgingsLength: number = 0;

  getDestinationByTag() {
    this.destinationsService.getByDestinationTag(this.destinationTag).subscribe({
      next: (data: ServerResponse) => {
        this.destination = data.response;
        this.lodgings = this.destination.lodgings;
        this.lodgingsLength = this.lodgings.length;
        this.error = false;
      },
      error: (error: string) => {
        this.error = true;
        this.message = error;
      }
    })
  }

}
