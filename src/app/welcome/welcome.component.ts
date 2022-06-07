import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  name: string = '';

  constructor(private localStorage: LocalStorageService) {
    const loginData = this.localStorage.getData();
    if (loginData) {
      const userData = JSON.parse(loginData);
      this.name = userData.name;
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.localStorage.removeData();
    window.location.reload();
  }

}
