import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Windowref {

  constructor() { }

  getNativeWindow() {
    return window;
  }
}
