import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  constructor() {}

  get(key: string): any {
    try {
      // tslint:disable-next-line:no-non-null-assertion
      return JSON.parse(localStorage.getItem(key)!);
    } catch (e) {
      console.error('Unable to get localStorage item: ', e);
      return undefined;
    }
  }

  set(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Unable to set localStorage item: ', e);
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Unable to remove localStorage item!');
    }
  }
}
