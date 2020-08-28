import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { getTitle } from 'src/app/shared/utils';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  registerMessage: any = null;
  inputType = 'password';
  visible = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    title: Title,
  ) {
    title.setTitle(getTitle('Register'));
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  send() {
    this.registerMessage = null;
    if (this.form.valid) {
      this.authService.register(this.form.value).then(() => {
        this.router.navigate(['/dashboard']);
      }).catch((error) => {
        this.registerMessage = error;
      });
    }
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
    } else {
      this.inputType = 'text';
      this.visible = true;
    }
  }
}
