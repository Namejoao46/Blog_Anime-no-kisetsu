import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string){
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { username, password }, { responseType: 'text' });
  }
}
