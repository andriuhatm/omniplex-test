import { Component } from '@angular/core';
import { ChromeScriptService } from '../services/chrome-script.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  name: string = '';

  constructor(private localStorage: LocalStorageService, private chromeScript: ChromeScriptService) {
    const loginData = this.localStorage.getData();
    if (loginData) {
      const userData = JSON.parse(loginData);
      this.name = userData.name;
    }
  }

  // this will let the idle modal know the user logged out
  flagModalExpired() {
    this.chromeScript.runScript(() => {
      let modalEl = document.getElementById('idle-modal');
      if (modalEl) {
        modalEl.dataset['expired'] = 'true';
      }
    });
  }

  logout() {
    this.localStorage.removeData();
    this.flagModalExpired();
    window.location.reload();
  }

}
