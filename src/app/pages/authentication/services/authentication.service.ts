import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private path = environment.apiUrl+"/api"

  constructor(private httpClient: HttpClient) { }
  register(user: any ){
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(this.path + "/auth/signup", user )
  }
  login(user: any ){
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(this.path + "/auth/signin", user )
  }
  LoginWithFacebook(credentials: string ){
    console.log("🚀 ~ AuthenticationService ~ LoginWithFacebook ~ credentials:", JSON.stringify(credentials))
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(this.path + "/auth/login/facebook", credentials )
  }
}
