import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AchievementsTeam } from 'src/app/models/AchievementsTeam';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AchievementsteamService {
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

  getAllAchievementsTeams(): Observable<AchievementsTeam[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<AchievementsTeam[]>(`${this.apiUrl}/getAchievementsTeam`, { headers });
  }

  getAchievementsTeamById(id: number): Observable<AchievementsTeam> {
    const headers = this.getHeaders();
    return this.httpClient.get<AchievementsTeam>(`${this.apiUrl}/getAchievementsTeam/${id}`, { headers });
  }

  addAchievementsTeam(achievementsTeam: AchievementsTeam): Observable<AchievementsTeam> {
    const headers = this.getHeaders();
    return this.httpClient.post<AchievementsTeam>(`${this.apiUrl}/Add-AchievementsTeam`, achievementsTeam, { headers });
  }

  updateAchievementsTeam(id: number, modifiedAchievementsTeam: AchievementsTeam): Observable<AchievementsTeam> {
    const headers = this.getHeaders();
    return this.httpClient.put<AchievementsTeam>(`${this.apiUrl}/updateAchievementsTeam/${id}`, modifiedAchievementsTeam, { headers });
  }

  deleteAchievementsTeam(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/remove-achievementsTeam/${id}`, { headers });
  }
}