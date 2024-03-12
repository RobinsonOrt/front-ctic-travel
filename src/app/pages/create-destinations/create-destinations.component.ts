import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorSpanComponent } from '../../components/error-span/error-span.component';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { DestinationsService } from '../../core/services/destinations/destinations.service';
import { NgIf } from '@angular/common';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-create-destinations',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorSpanComponent, RouterModule, ButtonComponent, SuccessMessageComponent, ErrorMessageComponent, NgIf],
  templateUrl: './create-destinations.component.html',
  styleUrl: './create-destinations.component.css'
})
export class CreateDestinationsComponent {
  constructor(private fb: FormBuilder, private destinationsService: DestinationsService, private router: Router) { }
  error?: boolean = false;
  success?: boolean = false;
  message?: string = '';

  get destinationLocation() { return this.destinationForm.get('destinationLocation') as FormControl }
  get destinationAttractions() { return this.destinationForm.get('destinationAttractions') as FormControl }

  destinationForm = this.fb.group({
    'destinationLocation': ['', [Validators.required, Validators.maxLength(120)]],
    'destinationAttractions': ['', [Validators.required, Validators.maxLength(360)]],
  });

  onSubmit() {
    if (this.destinationForm.valid) {
      this.error = false;
      this.destinationsService.addDestination(this.destinationForm.value).subscribe({
        next: (data) => {
          this.success = true;
          this.message = data.response;
          setTimeout(() => {
            this.router.navigate(['/destinos']);
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
