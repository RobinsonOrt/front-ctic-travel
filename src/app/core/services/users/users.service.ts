import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({'Authorization':localStorage.getItem('token') ?? ''});
  }

  loginUser(userForm: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}users/login`, JSON.stringify(userForm))
  }

  registerUser(userForm: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}users/register`, userForm)
  }

  setToDestinationPlan(destinationPlanId: string): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}users/set-to-destination-plan/${localStorage.getItem('userId')}/${destinationPlanId}`, {}, {headers: this.getHeaders()})
  }

  removeFromDestinationPlan(destinationPlanId: string): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}users/remove-from-destination-plan/${localStorage.getItem('userId')}/${destinationPlanId}`, {}, {headers: this.getHeaders()})
  }

  logOut() {
    localStorage.clear();
    window.location.href = '/';
  }
}
