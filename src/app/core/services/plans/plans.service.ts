import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({'Authorization':localStorage.getItem('token') ?? ''});
  }

  getPlans(page: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}plans/get-all/${page}`, {headers: this.getHeaders()})
  }

  deletePlan(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}plans/delete/${id}`, {headers: this.getHeaders()})
  }

  getPlansToDestination(tag: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}plans/get-to-destination/${tag}`, {headers: this.getHeaders()})
  }

  getPlansByDestination(tag: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}plans/get-by-destination/${tag}`, {headers: this.getHeaders()})
  }

  addPlan(plan: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}plans/create`, plan, {headers: this.getHeaders()})
  }

  getPlansToUser(destinationTag: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}plans-destinations/get-to-user/${localStorage.getItem('userId') ?? ''}/${destinationTag}`, {headers: this.getHeaders()})
  }

  getPlansByUser(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}plans-destinations/get-by-user/${localStorage.getItem('userId') ?? ''}`, {headers: this.getHeaders()})
  }
}
