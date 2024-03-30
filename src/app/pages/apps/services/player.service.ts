import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/Player';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

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

  getAllPlayers(): Observable<Player[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<Player[]>(`${this.apiUrl}/getPlayer`, { headers });
  }

  getPlayerById(id: number): Observable<Player> {
    const headers = this.getHeaders();
    return this.httpClient.get<Player>(`${this.apiUrl}/getPlayer/${id}`, { headers });
  }

  addPlayer(player: Player): Observable<Player> {
    const headers = this.getHeaders();
    return this.httpClient.post<Player>(`${this.apiUrl}/Add-player`, player, { headers });
  }

  updatePlayer(id: number, modifiedPlayer: Player): Observable<Player> {
    const headers = this.getHeaders();
    return this.httpClient.put<Player>(`${this.apiUrl}/${id}`, modifiedPlayer, { headers });
  }

  deletePlayer(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/remove-player/${id}`, { headers });
  }
}