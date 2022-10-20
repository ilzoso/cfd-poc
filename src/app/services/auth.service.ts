import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  constructor(private logger: LoggerService) { 
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logger.log(`${req.method} ${req.urlWithParams}`, []);
    const authReq = req.clone({
      headers: req.headers, 
      withCredentials: true
    });
    return next.handle(authReq);
  }
}
