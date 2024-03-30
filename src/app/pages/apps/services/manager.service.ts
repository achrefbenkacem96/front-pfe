import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from 'src/app/models/Manager';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private apiUrl = environment.apiUrl;
  private token: string | null;

  constructor(private httpClient: HttpClient) {
    this.token = localStorage.getItem('accessToken');
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllManagers(): Observable<Manager[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<Manager[]>(`${this.apiUrl}/getManager`, { headers });
  }

  getManagerById(id: number): Observable<Manager> {
    const headers = this.getHeaders();
    return this.httpClient.get<Manager>(`${this.apiUrl}/getManager/${id}`, { headers });
  }

  addManager(manager: Manager): Observable<Manager> {
    const headers = this.getHeaders();
    return this.httpClient.post<Manager>(`${this.apiUrl}/Add-Manager`, manager, { headers });
  }

  updateManager(id: number, modifiedManager: Manager): Observable<Manager> {
    const headers = this.getHeaders();
    return this.httpClient.put<Manager>(`${this.apiUrl}/${id}`, modifiedManager, { headers });
  }

  deleteManager(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/remove-manager/${id}`, { headers });
  }
}
