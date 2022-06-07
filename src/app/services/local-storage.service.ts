import { Injectable } from '@angular/core';


@Injectable({
   providedIn: 'root'
})
export class LocalStorageService {

   LOCAL_STORAGE_KEY = 'omniplex_';

   constructor() { }

   setData(data: any) {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(this.LOCAL_STORAGE_KEY, jsonData);
   }

   getData() {
      return localStorage.getItem(this.LOCAL_STORAGE_KEY);
   }

   removeData() {
      localStorage.removeItem(this.LOCAL_STORAGE_KEY);
   }
}
