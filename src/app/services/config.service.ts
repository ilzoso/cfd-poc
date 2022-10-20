import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getApiUri(): string {
    return `https://localhost`;
    //const port = ":443";
    //return `${this.window.location.protocol}//${this.window.location.hostname}${port}`;
  }

}
