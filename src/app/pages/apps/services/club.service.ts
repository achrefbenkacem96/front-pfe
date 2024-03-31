import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Club } from 'src/app/models/Club';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
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

  getAllClubs(): Observable<Club[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<Club[]>(`${this.apiUrl}/getClub`, { headers });
  }

  getClubById(id: number): Observable<Club> {
    const headers = this.getHeaders();
    return this.httpClient.get<Club>(`${this.apiUrl}/getClub/${id}`, { headers });
  }

  addClub(club: Club): Observable<Club> {
    const headers = this.getHeaders();
    return this.httpClient.post<Club>(`${this.apiUrl}/Add-club`, club, { headers });
  }

  updateClub(id: number, modifiedClub: Club): Observable<Club> {
    const headers = this.getHeaders();
    return this.httpClient.put<Club>(`${this.apiUrl}/club/${id}`, modifiedClub, { headers });
  }

  deleteClub(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/remove-club/${id}`, { headers });
  }
}