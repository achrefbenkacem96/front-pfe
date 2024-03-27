// src/app/services/manager.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Manager } from '../models/Manager';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private apiUrl = 'http://localhost:8089/api/manager';

  constructor(private http: HttpClient) { }

  getAllManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(`${this.apiUrl}/getAll`);
  }

  addManager(manager: Manager): Observable<Manager> {
    return this.http.post<Manager>(`${this.apiUrl}/add`, manager);
  }
}
