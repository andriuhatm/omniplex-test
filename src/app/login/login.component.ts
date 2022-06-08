import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ChromeScriptService } from '../services/chrome-script.service';
import { LocalStorageService } from '../services/local-storage.service';
import { PasswordValidator } from './Validators/Password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private chromeScript: ChromeScriptService) {
  }

  loginForm: any = FormGroup;
  submitted = false;

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    if (this.submitted) {
      this.localStorage.setData({
        name: this.f.name.value,
        password: this.f.password.value
      });
      this.chromeScript.runScript(() => {
        let modalEl = document.getElementById('idle-modal');
        if (modalEl) {
          modalEl.dataset['expired'] = 'false';
        }
      });
      window.location.reload();
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, PasswordValidator()]],
    });
  }

}
