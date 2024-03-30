import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeanceEntrainement } from 'src/app/models/SeanceEntrainement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeanceEntrainementService {
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

  getAllSeanceEntrainements(): Observable<SeanceEntrainement[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<SeanceEntrainement[]>(`${this.apiUrl}/getSeanceEntrainement`, { headers });
  }

  getSeanceEntrainementById(id: number): Observable<SeanceEntrainement> {
    const headers = this.getHeaders();
    return this.httpClient.get<SeanceEntrainement>(`${this.apiUrl}/getSeanceEntrainement/${id}`, { headers });
  }

  addSeanceEntrainement(seanceEntrainement: SeanceEntrainement): Observable<SeanceEntrainement> {
    const headers = this.getHeaders();
    return this.httpClient.post<SeanceEntrainement>(`${this.apiUrl}/Add-SeanceEntrainement`, seanceEntrainement, { headers });
  }

  updateSeanceEntrainement(id: number, modifiedSeanceEntrainement: SeanceEntrainement): Observable<SeanceEntrainement> {
    const headers = this.getHeaders();
    return this.httpClient.put<SeanceEntrainement>(`${this.apiUrl}/${id}`, modifiedSeanceEntrainement, { headers });
  }

  deleteSeanceEntrainement(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/remove-SeanceEntrainement/${id}`, { headers });
  }
}