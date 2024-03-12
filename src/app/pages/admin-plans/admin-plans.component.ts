import { Component } from '@angular/core';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { NgFor, NgIf } from '@angular/common';
import { PlansService } from '../../core/services/plans/plans.service';
import { ServerResponse } from '../../interfaces/server-response';

@Component({
  selector: 'app-admin-plans',
  standalone: true,
  imports: [SuccessMessageComponent, ErrorMessageComponent, PaginationComponent, NgIf, NgFor],
  templateUrl: './admin-plans.component.html',
  styleUrl: './admin-plans.component.css'
})
export class AdminPlansComponent {
  constructor(private plansService: PlansService) {
    this.getPlans();
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
    this.getPlans();
  }

  getPlans() {
    this.plansService.getPlans(this.page).subscribe({
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
  deletePlan(id: string) {
    this.plansService.deletePlan(id).subscribe({
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
