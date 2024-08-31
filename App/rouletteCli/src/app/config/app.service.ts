import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NumberRoulette } from '../models/number';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }

getNumber() {
  return this.http.get("http://192.168.1.19:6060/numbers");
}
getMessage() {
  return this.http.get("http://192.168.1.19:6060/messages");
}
}