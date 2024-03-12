import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({'Authorization':localStorage.getItem('token') ?? ''});
  }

  getDestinations(page: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}destinations/get-all/${page}`, {headers: this.getHeaders()})
  }

  deleteDestination(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}destinations/delete/${id}`, {headers: this.getHeaders()})
  }

  getByDestinationTag(tag: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}destinations/get-by-tag/${tag}`, {headers: this.getHeaders()})
  }

  addPlanToDestination(destinationTag: string, planTag: string): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}destinations/add-plan/${destinationTag}/${planTag}`, {}, {headers: this.getHeaders()})
  }

  removePlanFromDestination(destinationTag: string, planTag: string): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}destinations/remove-plan/${destinationTag}/${planTag}`, {}, {headers: this.getHeaders()})
  }

  addDestination(destination: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}destinations/create`, destination, {headers: this.getHeaders()})
  }
}
