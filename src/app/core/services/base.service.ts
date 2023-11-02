import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(public _http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this._http.get<T>(url).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  getById<T>(url: string, id: string): Observable<T> {
    return this._http.get<T>(`${url}/?id=${id}`).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  post<T>(url: string, body: any): Observable<T> {
    return this._http.post<T>(url, body).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  put<T>(url: string, id: string, body: object): Observable<T> {
    return this._http.put<T>(`${url}/?id=${id}`, body).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  delete<T>(url: string, id: string): Observable<T> {
    return this._http.delete<T>(`${url}/?id=${id}`).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }
}
