import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(msg: string, params: any[]): void {
    if (!environment.production) {
      if (params && params.length > 0) {
        console.log(msg, params);
      }
      else {
        console.log(msg);
      }
    }
    else {
      // application insights or other production logging framework
    }
  }

  logError(msg: string, params: any[]): void {
    if (!environment.production) {
      if (params && params.length > 0) {
        console.error(msg, params);
      }
      else {
        console.error(msg);
      }
    }
    else {
      // application insights or other production logging framework
    }
  }

}
