import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'omniplex-test';
  loginData: any;
  isLoggedIn: boolean;

  constructor(private localStorage: LocalStorageService) {
    this.loginData = this.localStorage.getData();
    this.isLoggedIn = this.loginData?.length;
  }
}
