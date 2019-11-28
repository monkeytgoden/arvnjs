import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, of, Subscription, timer } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { environment as config } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public auth$ = this.authSubject.asObservable();
  returnUrl = '/';
  refreshSubscription: Subscription;

  constructor(
    public router: Router,
    private http: HttpClient
  ) { }

  isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expiresAt'));
    return expiresAt != null && new Date().getTime() < expiresAt;
  }

  public login(userName: string, password: string, returnUrl: string) {
    return this.http.post<any>(
      `${config.auth.authUrl}/login`,
      {
        user_name: userName,
        password
      }).pipe(map(authResult => {
        this.returnUrl = returnUrl;
        if (authResult) {
          this.setSession(authResult);
          this.authSubject.next(true);
        } else {
          this.authSubject.next(false);
        }
        return authResult;
      }));
  }

  setSession(authResult): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expiresAt', expiresAt);
    localStorage.setItem('authUser', JSON.stringify(authResult.user));

    this.scheduleRenewal();
  }

  public scheduleRenewal(): void {
    if (!this.isAuthenticated()) { return; }
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(localStorage.getItem('expiresAt'));

    const expiresIn$ = of(expiresAt).pipe(
      mergeMap(
        // tslint:disable-next-line:no-shadowed-variable
        expiresAt => {
          const now = moment().add(2, 'minutes').valueOf();
          return timer(Math.max(1, expiresAt - now), 60000);
        }
      )
    );

    this.refreshSubscription = expiresIn$.subscribe(
      () => {
        this.renewToken();
      }
    );
  }

  public unscheduleRenewal(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  public renewToken() {
    this.removeSession();
    this.router.navigate(['/login']);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public navigateAfterLogin(): void {
    this.router.navigate([this.returnUrl]).then(() => {
      this.returnUrl = '/';
    });
  }

  public logout() {
    return this.http.get<any>(
      `${config.auth.authUrl}/logout`,
      { headers: new HttpHeaders({ authorization: localStorage.getItem('token') }) }
    ).pipe(map(authResult => {
      if (authResult) {
        this.removeSession();
        this.authSubject.next(false);
        this.router.navigate(['/login']);
      }
      return authResult;
    }));
  }

  removeSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('authUser');
  }
}
