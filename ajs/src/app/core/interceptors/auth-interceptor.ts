import {
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment as config } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent |
                                                       HttpHeaderResponse |
                                                       HttpProgressEvent |
                                                       HttpResponse<any> |
                                                       HttpUserEvent<any>> {
    const copiedReq = req.clone({headers: req.headers.set('authorization', `Bearer ${localStorage.getItem('token')}`)});
    if (req.url.indexOf(`${config.auth.authUrl}/login`) < 0) {
      return next.handle(copiedReq);
    }
    return next.handle(req);
  }
}
