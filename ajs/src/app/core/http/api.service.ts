import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment as config } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getHttpClient(): HttpClient {
    return this.http;
  }

  post(url: string, body: any, headers = {'Content-Type': 'application/json'}): Observable<any> {
    return this.http.post(`${config.api.baseUrl}${url}`, body, { headers } );
  }

  get(url: string, params = new HttpParams()): Observable<any> {
    return this.http.get(`${config.api.baseUrl}${url}`, { observe: 'body', params});
  }

  delete(url: string): Observable<any> {
    return this.http.delete(`${config.api.baseUrl}${url}`);
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(`${config.api.baseUrl}${url}`, body);
  }

}
