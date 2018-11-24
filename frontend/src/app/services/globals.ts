import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Globals {
  appJSRoot: string = window['appJSRoot'];
  logoutUrl: string = window['logoutUrl'];
  wsScheme: string = window.location.protocol === 'https:' ? 'wss' : 'ws';
  host: string = window.location.host;
  dataSocketUrl: string = `${this.wsScheme}://${this.host}/data/stream/`;
  dataSocketRetryDelay: 10000;
}
