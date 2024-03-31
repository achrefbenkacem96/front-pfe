declare var google: any;
declare var FB: any;
import { Component, ElementRef, NgZone  } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent  implements AfterViewInit {
  error:string|null=""
  @ViewChild('google_btn') google_btn?: ElementRef;

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id:"495918652696-38r60r2l64cosak6789fo3s2u0vbu293.apps.googleusercontent.com",
      callback: (resp: any) => {
        // console.log("🚀 ~ AppSideLoginComponent ~ ngOnInit ~ resp:", resp)
      
      }
    })
    console.log(this.google_btn?.nativeElement);
    
    google.accounts.id.renderButton(this.google_btn?.nativeElement,{
      theme: 'filled_blue',
      size: 'rectangle',
      shape: 'rectangle',
       with: 150
    })
  }
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private _ngZone: NgZone, private router: Router, private authentication: AuthenticationService) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }
  async login(){
    FB.login(async (result:any) => {
      console.log("🚀 ~ AppSideLoginComponent ~ FB.login ~ result:", result)
      return  await this.authentication.LoginWithFacebook(result.authResponse.accessToken).subscribe(
        	(x:any) => {
          	this._ngZone.run(()=>{
            	this.router.navigate(['/authentication/side-login']);
          	})},
          	(error:any) => {
            	console.log(error);
          	}
      	)
    	},{scope:'email'} )
  }
  submit() {
    // console.log(this.form.value);
    this.authentication.login(this.form.value).subscribe({
      next:(res) => {
        console.log("🚀 ~ next ~ res:", res)
        //@ts-ignore
        localStorage.setItem('accessToken',res.accessToken)
        //@ts-ignore
        localStorage.setItem('role',res.roles[0])
         //@ts-ignore
        localStorage.setItem('username',res.username)
        //@ts-ignore
        localStorage.setItem('userId',res.id)
        window.location.href = '/dashboards/dashboard1' ;
        return {
        }
      },
      error:(err) => {
            console.log("🚀 ~ error ~ err:", err)
            this.error ="email or password incorrect"
        return {
        }
      },

    })
  }
}
