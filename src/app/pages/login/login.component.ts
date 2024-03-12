import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorSpanComponent } from '../../components/error-span/error-span.component';
import { ButtonComponent } from '../../components/button/button.component';
import { UsersService } from '../../core/services/users/users.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, ErrorSpanComponent, RouterModule, ButtonComponent, ErrorMessageComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    
    error?: boolean = false;
    message?: string = '';
    constructor(private fb: FormBuilder, private usersService: UsersService) {
    }
    
    get userEmail() { return this.userForm.get('userEmail') as FormControl }
    get userPassword() { return this.userForm.get('userPassword') as FormControl }

    userForm = this.fb.group({
        'userEmail': ['', [Validators.required, Validators.email]],
        'userPassword': ['', Validators.required],
    });

    onSubmit() {
        if (this.userForm.valid) {
            this.usersService.loginUser(this.userForm.value).subscribe({
                next: (data) => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('userRole', data.userRole);
                    localStorage.setItem('userEmail', data.userEmail);
                    localStorage.setItem('logged', 'true');
                    window.location.href = '/';
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