import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contratplayer } from 'src/app/models/Contratplayer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratplayerService {
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

  getAllContratplayers(): Observable<Contratplayer[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<Contratplayer[]>(`${this.apiUrl}/getContratplayer`, { headers });
  }

  getContratplayerById(id: number): Observable<Contratplayer> {
    const headers = this.getHeaders();
    return this.httpClient.get<Contratplayer>(`${this.apiUrl}/getContratplayer/${id}`, { headers });
  }

  addContratplayer(contratplayer: Contratplayer): Observable<Contratplayer> {
    const headers = this.getHeaders();
    return this.httpClient.post<Contratplayer>(`${this.apiUrl}/Add-Contratplayer`, contratplayer, { headers });
  }

  updateContratplayer(id: number, modifiedContratplayer: Contratplayer): Observable<Contratplayer> {
    const headers = this.getHeaders();
    return this.httpClient.put<Contratplayer>(`${this.apiUrl}/updateContratplayer/${id}`, modifiedContratplayer, { headers });
  }

  deleteContratplayer(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/remove-contratplayer/${id}`, { headers });
  }
}