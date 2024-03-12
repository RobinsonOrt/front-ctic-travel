import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { ErrorSpanComponent } from '../../components/error-span/error-span.component';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users/users.service';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorSpanComponent, RouterModule, ButtonComponent, ErrorMessageComponent, SuccessMessageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) {
  }
  error?: boolean = false;
  success?: boolean = false;
  message?: string = '';

  get userName() { return this.userForm.get('userName') as FormControl }
  get userLastName() { return this.userForm.get('userLastName') as FormControl }
  get userEmail() { return this.userForm.get('userEmail') as FormControl }
  get userPassword() { return this.userForm.get('userPassword') as FormControl }

  userForm = this.fb.group({
      'userName': ['', [Validators.required, Validators.maxLength(60)]],
      'userLastName': ['', [Validators.required, Validators.maxLength(60)]],
      'userEmail': ['', [Validators.required, Validators.email]],
      'userPassword': ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]]
  });

  onSubmit() {
    if (this.userForm.valid) {
        this.error = false;
        this.usersService.registerUser(this.userForm.value).subscribe({
            next: (data) => {
              this.success = true;
              this.message = data.response;
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 2000);
            },
            error: (error) => {
              this.error = true;
              this.message = error;
            }
        });
    } else {
        this.message = 'Los campos no son válidos, revisa los datos ingresados.';
    }
  }
}
