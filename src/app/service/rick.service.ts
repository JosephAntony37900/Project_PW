import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RickService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/character`);
  }

  getCharacterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/character/${id}`);
  }

  getCharactersByEpisode(episodeId: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/episode/${episodeId}`).pipe(
      switchMap((episode) => {
        const characterObservables = episode.characters.map((url: string) => this.http.get<any>(url));
        return forkJoin(characterObservables);
      }),
      map((characters) => characters as any[]) // Aseguramos que el tipo sea any[]
    );
  }
}
