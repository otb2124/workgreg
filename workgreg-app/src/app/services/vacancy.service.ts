import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vacancy {
  id: number;
  title: string;
  source: string;
  location: string;
}

export interface HealthStatus {
  status: string;
  mode: string;
}

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  private readonly baseUrl: string;

  constructor(private readonly http: HttpClient) {
    // Check if running inside the Tauri native desktop wrapper
    const isTauri = '__TAURI_INTERNALS__' in window || '__TAURI__' in window;
    
    // Route to local Python sidecar for Desktop, or Cloud API for Web
    this.baseUrl = isTauri 
      ? 'http://127.0.0.1:8000' 
      : 'https://api.yourcloudjobfinder.com';
  }

  getHealth(): Observable<HealthStatus> {
    return this.http.get<HealthStatus>(`${this.baseUrl}/api/health`);
  }

  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${this.baseUrl}/api/vacancies`);
  }
}