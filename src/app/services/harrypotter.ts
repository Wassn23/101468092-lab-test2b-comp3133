import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class HarrypotterService {

  private baseUrl = 'https://hp-api.onrender.com/api';

  constructor(private http: HttpClient) {}

  // Get all characters
  getAllCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters`);
  }

  // Get characters by house
  getCharactersByHouse(house: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters/house/${house}`);
  }

  // Get character by ID
  getCharacterById(id: string): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }
}