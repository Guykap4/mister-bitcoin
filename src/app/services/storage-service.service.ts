import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
}
