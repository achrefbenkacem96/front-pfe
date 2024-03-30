import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/Team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
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

  getAllTeams(): Observable<Team[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<Team[]>(`${this.apiUrl}/getTeam`, { headers });
  }

  getTeamById(id: number): Observable<Team> {
    const headers = this.getHeaders();
    return this.httpClient.get<Team>(`${this.apiUrl}/getTeam/${id}`, { headers });
  }

  addTeam(team: Team): Observable<Team> {
    const headers = this.getHeaders();
    return this.httpClient.post<Team>(`${this.apiUrl}/Add-team`, team, { headers });
  }

  updateTeam(id: number, modifiedTeam: Team): Observable<Team> {
    const headers = this.getHeaders();
    return this.httpClient.put<Team>(`${this.apiUrl}/${id}`, modifiedTeam, { headers });
  }

  deleteTeam(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/remove-team/${id}`, { headers });
  }
}