import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private path = environment.apiUrl
  token:string | null
  constructor(private httpClient: HttpClient) { }
  getAll(){
    this.token = localStorage.getItem('accessToken');
    console.log("🚀 ~ UsersService ~ getAll ~ this.token:", this.token)
    //@ts-ignore
    const header = new HttpHeaders().set("Authorization", "Bearer "+ this.token);
    return this.httpClient.get(this.path + "/user/retrieve-all-user" ,{headers: header})
  }
  addUser(body: any) {
    const token = localStorage.getItem('accessToken');
    console.log("🚀 ~ UsersService ~ addUser ~ token:", token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<any>(`${this.path}/user/Add-user`, body, { headers });
  }
  update(body: any,id:number) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Add content type header
    });

    return this.httpClient.put<any>(`${this.path}/user/modifyuser/${id}`, body, { headers });
  }
  delete(userId: number) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.delete<void>(`${this.path}/user/remove-user/${userId}`, { headers });
  }
 
}