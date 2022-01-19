import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';
import { CurrentAllowedLocalStorageFields } from '../models/local-storage.model';


@Injectable({
  providedIn: 'root'
})
export class TypedLocalStorageService {
  constructor(@Inject(LOCAL_STORAGE) private readonly _localStorage: Storage,
  ) { }


  setItem<K extends keyof CurrentAllowedLocalStorageFields, V extends CurrentAllowedLocalStorageFields[K]>(key: K, value: V) {
    this._localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<K extends keyof CurrentAllowedLocalStorageFields>(key: K):CurrentAllowedLocalStorageFields[K] | null {
    const accessedField = this._localStorage.getItem(key);
    return accessedField ? JSON.parse(accessedField) : null;
  }

  removeItem<K extends keyof CurrentAllowedLocalStorageFields>(key: K) {
    this._localStorage.removeItem(key);
  }

}
