import { Component } from '@angular/core';
import { DestinationsService } from '../../core/services/destinations/destinations.service';
import { NgFor, NgIf } from '@angular/common';
import { ServerResponse } from '../../interfaces/server-response';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-destinations',
  standalone: true,
  imports: [SuccessMessageComponent, ErrorMessageComponent, PaginationComponent, NgIf, NgFor, RouterModule],
  templateUrl: './admin-destinations.component.html',
  styleUrl: './admin-destinations.component.css'
})
export class AdminDestinationsComponent {
  constructor(private destinationsService: DestinationsService) {
    this.getDestinations();
  }
  page = 0;
  error: boolean = true;
  message: string = 'Cargando registros...';
  response: any = {}
  maxPage: number = 0;
  localError: boolean = false;
  success: boolean = false;

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
  deleteDestination(id: string) {
    this.destinationsService.deleteDestination(id).subscribe({
      next: (data: ServerResponse) => {
        this.localError = data.error;
        this.message = data.response;
        this.success = true;
        this.pageChange(0)
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
