import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coach } from 'src/app/models/Coach';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
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

  getAllCoaches(): Observable<Coach[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<Coach[]>(`${this.apiUrl}/getCoach`, { headers });
  }

  getCoachById(id: any): Observable<Coach> {
    const headers = this.getHeaders();
    return this.httpClient.get<Coach>(`${this.apiUrl}/getCoach/${id}`, { headers });
  }

  addCoach(coach: Coach): Observable<Coach> {
    const headers = this.getHeaders();
    return this.httpClient.post<Coach>(`${this.apiUrl}/Add-Coach`, coach, { headers });
  }

  updateCoach(id: number, modifiedCoach: Coach): Observable<Coach> {
    const headers = this.getHeaders();
    return this.httpClient.put<Coach>(`${this.apiUrl}/coach/${id}`, modifiedCoach, { headers });
  }

  deleteCoach(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/remove-coach/${id}`, { headers });
  }
}