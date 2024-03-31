import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sponsor } from 'src/app/models/Sponsor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {
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

  getAllSponsors(): Observable<Sponsor[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<Sponsor[]>(`${this.apiUrl}/getSponsor`, { headers });
  }

  getSponsorById(id: number): Observable<Sponsor> {
    const headers = this.getHeaders();
    return this.httpClient.get<Sponsor>(`${this.apiUrl}/getSponsor/${id}`, { headers });
  }

  addSponsor(sponsor: Sponsor): Observable<Sponsor> {
    const headers = this.getHeaders();
    return this.httpClient.post<Sponsor>(`${this.apiUrl}/Add-sponsor`, sponsor, { headers });
  }

  updateSponsor(id: number, modifiedSponsor: Sponsor): Observable<Sponsor> {
    const headers = this.getHeaders();
    return this.httpClient.put<Sponsor>(`${this.apiUrl}/sponsor/${id}`, modifiedSponsor, { headers });
  }

  deleteSponsor(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/remove-sponsor/${id}`, { headers });
  }
}