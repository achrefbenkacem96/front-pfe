import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SponsorTeam } from 'src/app/models/SponsorTeam';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SponsorTeamService {
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

  getAllSponsorTeams(): Observable<SponsorTeam[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<SponsorTeam[]>(`${this.apiUrl}/getSponsorTeam`, { headers });
  }

  getSponsorTeamById(id: number): Observable<SponsorTeam> {
    const headers = this.getHeaders();
    return this.httpClient.get<SponsorTeam>(`${this.apiUrl}/getSponsorTeam/${id}`, { headers });
  }

  addSponsorTeam(sponsorTeam: SponsorTeam): Observable<SponsorTeam> {
    const headers = this.getHeaders();
    return this.httpClient.post<SponsorTeam>(`${this.apiUrl}/Add-SponsorTeam`, sponsorTeam, { headers });
  }

  updateSponsorTeam(id: number, modifiedSponsorTeam: SponsorTeam): Observable<SponsorTeam> {
    const headers = this.getHeaders();
    return this.httpClient.put<SponsorTeam>(`${this.apiUrl}/updateSponsorTeam/${id}`, modifiedSponsorTeam, { headers });
  }

  deleteSponsorTeam(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/remove-sponsorTeam/${id}`, { headers });
  }
}