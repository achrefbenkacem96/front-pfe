import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { MaterialModule } from '../../../material.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-side-two-steps',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-two-steps.component.html',
})
export class AppSideTwoStepsComponent {
  options = this.settings.getOptions();
  code:any;
  message: string;
  constructor(private settings: CoreService, private router: Router, private authentication: AuthenticationService) { }
  form = new FormGroup({
    c1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    c2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    c3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    c4: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    c5: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    c6: new FormControl('', [Validators.required, Validators.maxLength(1)]),
     
  } );
  submit() {    
    console.log("🚀 ~ AppSideTwoStepsComponent ~ submit ~ this.form:", this.form.value)
    if (this.form.invalid) {
      alert("Please fix the errors in the form.");
      return;
    }
    if (this.form.hasError('passwordsNotMatching')) {
      alert("Passwords do not match.");
      return;
    }
    let code = '';

for (let key in  this.form.value) {
    if ( this.form.value.hasOwnProperty(key)) {
      //@ts-ignore
      code +=  this.form.value[key];
    }
  }
     // Proceed with form submission logic here
    this.authentication.verify(code).subscribe({
      next:(res) => {
        //@ts-ignore
        if (res.message ==="Account verified !") {
          this.router.navigate(['/authentication/side-login']);
        } else {
          this.message = res.message
          
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
    // 
  }
}
