import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Prospecto } from '../interfaces/prospecto.interface';
import { environments } from '../../../environments/environments';


@Injectable({providedIn: 'root'})
export class ProspectoService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getProspectos():Observable<Prospecto[]> {
    return this.http.get<Prospecto[]>(`${this.baseUrl}/prospectos`)
  }

  getProspectoById(id: string):Observable<Prospecto | undefined> {
    return this.http.get<Prospecto>(`${this.baseUrl}/prospectos/id/${id}`)
      .pipe(
        catchError( error => of(undefined))
      )
  }

    // TODO: suggestions

    addProspecto(prospecto: Prospecto):Observable<Prospecto> {
      return this.http.post<Prospecto>(`${this.baseUrl}/prospectos`, prospecto);
    }

    updateProspecto(prospecto: Prospecto):Observable<Prospecto> {
      if(!prospecto._id) throw Error('Prospecto id is required');

      return this.http.put<Prospecto>(`${this.baseUrl}/prospectos/${prospecto._id}`, prospecto);
    }

    deleteProspectoById(id: string):Observable<Prospecto | boolean> {
      if(!id) throw Error('prospecto id is required');

      return this.http.delete<Prospecto>(`${this.baseUrl}/prospectos/${id}`)
        .pipe(
          catchError( err => of(false) ),
          map( res => true )
        )
    }
}
