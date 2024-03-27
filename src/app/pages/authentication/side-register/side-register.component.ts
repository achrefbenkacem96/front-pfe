import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router, private authentication: AuthenticationService) { }

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordMatchingValidator });


  get f() {
    return this.form.controls;
  }

  submit() {    
    if (this.form.invalid) {
      alert("Please fix the errors in the form.");
      return;
    }
    if (this.form.hasError('passwordsNotMatching')) {
      alert("Passwords do not match.");
      return;
    }
    // Proceed with form submission logic here
    this.authentication.register(this.form.value).subscribe({
      next:(res) => {
        //@ts-ignore
        if (res.message === "Utilisateur enregistré avec succès !") {
          this.router.navigate(['/authentication/side-login']);
        } else {
          alert("Please fix the errors in the form.");
        }
        console.log("🚀 ~ AppSideRegisterComponent ~ this.authentication.register ~ res:", res)
        return {
      }
      },
      error:(err) => {
        console.log("🚀 ~ AppSideRegisterComponent ~ this.authentication.register ~ err:", err)
        return {
      }
      }
    })
    // this.router.navigate(['/authentication/side-two-steps']);
  }
  private passwordMatchingValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsNotMatching: true };
  }
}
