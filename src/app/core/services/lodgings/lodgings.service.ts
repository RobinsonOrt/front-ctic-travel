import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LodgingsService {
  getHeaders(): HttpHeaders {
    return new HttpHeaders({'Authorization':localStorage.getItem('token') ?? ''});
  }

  constructor(private http: HttpClient) {}
  deleteLodging(id: string): Observable<any>  {
    return this.http.delete<any>(`${environment.apiUrl}lodgings/delete/${id}`, {headers: this.getHeaders()})
  }

  addLodging(lodging: any, destinationId: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}lodgings/create/${destinationId}`, lodging, {headers: this.getHeaders()})
  }
}
