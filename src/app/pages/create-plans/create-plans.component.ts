import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorSpanComponent } from '../../components/error-span/error-span.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { NgIf } from '@angular/common';
import { PlansService } from '../../core/services/plans/plans.service';

@Component({
  selector: 'app-create-plans',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorSpanComponent, RouterModule, ButtonComponent, SuccessMessageComponent, ErrorMessageComponent, NgIf],
  templateUrl: './create-plans.component.html',
  styleUrl: './create-plans.component.css'
})
export class CreatePlansComponent {
  constructor(private fb: FormBuilder, private plansService: PlansService ) {}
  error?: boolean = false;
  success?: boolean = false;
  message?: string = '';

  get planName() { return this.planForm.get('planName') as FormControl }
  get planPrice() { return this.planForm.get('planPrice') as FormControl }
  get planDuration() { return this.planForm.get('planDuration') as FormControl }
  get planMaxPeople() { return this.planForm.get('planMaxPeople') as FormControl }
  get planTransportationTypeId() { return this.planForm.get('planTransportationTypeId') as FormControl }

  planForm = this.fb.group({
    'planName': ['', [Validators.required, Validators.maxLength(120)]],
    'planPrice': ['', [Validators.required]],
    'planDuration': ['', [Validators.required, Validators.maxLength(60)]],
    'planMaxPeople': ['', [Validators.required]],
    'planTransportationTypeId': ['1', [Validators.required]],
    'planTransportationType': { planTransportationTypeId: ''}
  });

  onSubmit() {
    let form = this.planForm.value;
    form.planTransportationType = { planTransportationTypeId: form.planTransportationTypeId ?? '' };
    if (this.planForm.valid) {
      this.error = false;
      this.plansService.addPlan(this.planForm.value).subscribe({
        next: (data) => {
          this.success = true;
          this.message = data.response;
          setTimeout(() => {
            window.history.back();
          }, 2000);
        },
        error: (error) => {
          this.error = true;
          this.message = error;
        }
      });
    } else {
      this.error = true;
      this.message = 'Los campos no son válidos, revisa los datos ingresados.';
    }
  }
}