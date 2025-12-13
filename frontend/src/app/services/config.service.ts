import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AppConfig {
  apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig = {
    apiUrl: environment.apiUrl
  };

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>('/assets/config.json').pipe(
      map(config => {
        this.config = config;
        // Auto-detect backend URL from current host if needed
        // This handles cases where minikube IP changes
        this.config.apiUrl = this.determineBackendUrl(this.config.apiUrl);
        return this.config;
      }),
      catchError(() => {
        // Fallback: construct backend URL from current host
        this.config.apiUrl = this.determineBackendUrl(this.config.apiUrl);
        return of(this.config);
      })
    );
  }

  private determineBackendUrl(configUrl: string): string {
    // If running in browser (not SSR), try to auto-detect from window location
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      const currentPort = window.location.port;
      
      // If accessing via NodePort (30081 for frontend), construct backend URL
      // Backend is on port 30080
      if (currentPort === '30081' || host !== 'localhost') {
        // Use same host but backend port (30080)
        return `http://${host}:30080/student`;
      }
    }
    
    // Use configured URL (from config.json or environment)
    return configUrl;
  }

  getApiUrl(): string {
    return this.config.apiUrl;
  }
}

