import { Component } from '@angular/core';
import { DestinationsService } from '../../core/services/destinations/destinations.service';
import { ServerResponse } from '../../interfaces/server-response';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-user-destinations',
  standalone: true,
  imports: [ErrorMessageComponent, PaginationComponent, NgIf, NgFor, RouterModule],
  templateUrl: './user-destinations.component.html',
  styleUrl: './user-destinations.component.css'
})
export class UserDestinationsComponent {
  constructor(private destinationsService: DestinationsService) {
    this.getDestinations();
  }
  page = 0;
  error: boolean = true;
  message: string = 'Cargando registros...';
  response: any = {}
  maxPage: number = 0;

  pageChange(page: number) {
    this.page = page;
    this.getDestinations();
  }

  getDestinations() {
    this.destinationsService.getDestinations(this.page).subscribe({
      next: (data: ServerResponse) => {
        if (data.response.length === 0) {
          this.error = true;
          this.message = 'No hay registros para mostrar';
          return;
        }
        this.error = data.error;
        this.maxPage = data.maxPage;
        this.response = data.response;
      },
      error: (error: string) => {
        this.error = true;
        this.message = error;
      }
    });
  }

}
