import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-side-forgot-password',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-forgot-password.component.html',
})
export class AppSideForgotPasswordComponent {
  options = this.settings.getOptions();
  message: string;
  constructor(private settings: CoreService, private router: Router, private authentication: AuthenticationService) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.authentication.requestPasswordReset(this.form.value.email).subscribe({
      next:(res) => {
        //@ts-ignore
        this.message = "Check your email"
      },
      error:(err) => {
        this.message = "Something wrong "

        return {
      }
    }
    })
    // this.router.navigate(['/authentication/reset-pwd']);
  }
}
