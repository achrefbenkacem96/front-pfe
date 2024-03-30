import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scrims } from 'src/app/models/Scrims';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScrimsService {
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

  getAllScrims(): Observable<Scrims[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<Scrims[]>(`${this.apiUrl}/getScrim`, { headers });
  }

  getScrimById(id: number): Observable<Scrims> {
    const headers = this.getHeaders();
    return this.httpClient.get<Scrims>(`${this.apiUrl}/getScrim/${id}`, { headers });
  }

  addScrim(scrim: Scrims): Observable<Scrims> {
    const headers = this.getHeaders();
    return this.httpClient.post<Scrims>(`${this.apiUrl}/Add-Scrim`, scrim, { headers });
  }

  updateScrim(id: number, modifiedScrim: Scrims): Observable<Scrims> {
    const headers = this.getHeaders();
    return this.httpClient.put<Scrims>(`${this.apiUrl}/${id}`, modifiedScrim, { headers });
  }

  deleteScrim(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/remove-scrim/${id}`, { headers });
  }
}