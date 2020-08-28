import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { getTitle } from 'src/app/shared/utils';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loginMessage: any = null;
  inputType = 'password';
  visible = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    title: Title,
  ) {
    title.setTitle(getTitle('Login'));
  }
  ngOnDestroy(): void {
  }


  ngOnInit() {
    this.activatedRoute.queryParamMap
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        if (params.get('jwt')) {
          this.authService.setAuth(params.get('jwt')).then(() => {
            this.router.navigateByUrl('/dashboard');
          });
        }
      });

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  send() {
    this.loginMessage = null;
    if (this.form.valid) {
      this.authService.login(this.form.value).then((data) => {
        this.router.navigate(['/dashboard']);
      }).catch((error) => {
        this.loginMessage = error;
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
