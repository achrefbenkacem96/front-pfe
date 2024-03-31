import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CoreService } from 'src/app/services/core.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-side-reset-pwd',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-reset-pwd.component.html',
  styleUrl: './side-reset-pwd.component.scss'
})
export class SideResetPwdComponent {
  options = this.settings.getOptions();
  token:string;
  message:string;
  constructor(private settings: CoreService,
     private router: Router,
     private authentication: AuthenticationService,
     private activatedRoute: ActivatedRoute
     ) { }

  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit(){
    this.token = this.activatedRoute.snapshot.params['token'];
  }
  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.authentication.resetPassword(this.token, this.form.value.password).subscribe({
      next:(res) => {
        //@ts-ignore
        this.message = "Check your email"
      },
      error:(err) => {
        console.log("🚀 ~ SideResetPwdComponent ~ this.authentication.resetPassword ~ err:", err)
        this.message = "Something wrong "

        return {
      }
    }
    })
  
    // this.router.navigate(['/authentication/reset-pwd']);
  }
}