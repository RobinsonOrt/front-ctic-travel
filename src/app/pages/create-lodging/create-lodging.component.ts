import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorSpanComponent } from '../../components/error-span/error-span.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { NgIf } from '@angular/common';
import { LodgingsService } from '../../core/services/lodgings/lodgings.service';

@Component({
  selector: 'app-create-lodging',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorSpanComponent, RouterModule, ButtonComponent, SuccessMessageComponent, ErrorMessageComponent, NgIf],
  templateUrl: './create-lodging.component.html',
  styleUrl: './create-lodging.component.css'
})
export class CreateLodgingComponent {
  constructor(private fb: FormBuilder, private lodgingsService: LodgingsService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.destinationId = params['destinationId'];
    });
  }
  error?: boolean = false;
  success?: boolean = false;
  message?: string = '';
  destinationId: string = '';

  /* getters */
  get lodgingName() { return this.lodgingForm.get('lodgingName') as FormControl }
  get lodgingRooms() { return this.lodgingForm.get('lodgingRooms') as FormControl }
  get lodgingCheckIn() { return this.lodgingForm.get('lodgingCheckIn') as FormControl }
  get lodgingCheckOut() { return this.lodgingForm.get('lodgingCheckOut') as FormControl }
  get lodgingTypeId() { return this.lodgingForm.get('lodgingTypeId') as FormControl }

  lodgingForm = this.fb.group({
    'lodgingName': ['', [Validators.required, Validators.maxLength(120)]],
    'lodgingRooms': ['', [Validators.required]],
    'lodgingCheckIn': ['', [Validators.required]],
    'lodgingCheckOut': ['', [Validators.required]],
    'lodgingTypeId': ['1', [Validators.required]],
    'lodgingType': { lodgingTypeId: ''}
  });

  onSubmit() {
    let form = this.lodgingForm.value;
    form.lodgingType = { lodgingTypeId: form.lodgingTypeId ?? '' };
    if (this.lodgingForm.valid) {
      this.error = false;
      this.lodgingsService.addLodging(this.lodgingForm.value, this.destinationId).subscribe({
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


