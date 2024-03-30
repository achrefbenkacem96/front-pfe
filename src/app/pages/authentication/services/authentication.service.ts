import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  requestPasswordReset(email: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('email', email);

    return this.httpClient.post(`${this.path}/password/request`, body, { headers });
   }

  resetPassword(token: any, newPassword: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('token', token);
    body.set('newPassword', newPassword);
    return this.httpClient.post(`${this.path}/password/reset`,  body, { headers });
  }
}
