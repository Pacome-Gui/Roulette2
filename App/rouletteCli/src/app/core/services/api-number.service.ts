import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NumberRoulette } from 'src/app/models/number';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://192.168.1.19:6060';

  constructor(private http: HttpClient) { }

  getNumbers(): Observable<NumberRoulette[]> {
    return this.http.get<NumberRoulette[]>(`${this.apiUrl}/numbers`);
  }

  getMessage(): Observable<String> {
    return this.http.get<String>(`${this.apiUrl}/messages`);
  }
}