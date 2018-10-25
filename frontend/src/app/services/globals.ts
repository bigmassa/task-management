import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Globals {
  appJSRoot: string = window['appJSRoot'];
  logoutUrl: string = window['logoutUrl']
}
