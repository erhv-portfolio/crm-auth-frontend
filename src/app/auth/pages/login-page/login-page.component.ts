import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {
  private fb          = inject(FormBuilder);
  private authService = inject(AuthService);
  private router      = inject(Router);

  public myForm: FormGroup = this.fb.group({
    email:    ['veronica.flores@hotmail.com', [Validators.required, Validators.email]],
    password: ['12345678', [Validators.required, Validators.minLength(6)]]
  });

  login() {

    const {email, password} = this.myForm.value;

    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/prospectos'),
        error: (message) => {
          Swal.fire('Error', message, 'error')

        }

      })

  }
}
