import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Router } from '@angular/router';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { User, Payment } from 'src/app/models';
import { getTitle } from 'src/app/shared/utils';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  paymentError: any;
  loading = false;
  user: User;
  stripeForm: FormGroup;
  cardOptions = {
    hidePostalCode: true
  };

  elementsOptions: StripeElementsOptions = {
    //locale: 'en',
  };


  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private paymentService: PaymentService,
    private authService: AuthService,
    private router: Router,
    title: Title,
  ) {
    title.setTitle(getTitle('Dashboard'));
  }


  ngOnInit(): void {
    this.stripeForm = this.fb.group({
      amount: ['', [Validators.required]]
    });

    this.authService.$user.pipe(untilDestroyed(this)).subscribe((user) => this.user = user);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  createToken(): void {
    this.loading = true;
    const amount = this.stripeForm.get('amount').value;
    this.stripeService
      .createToken(this.card.element)
      .pipe(untilDestroyed(this))
      .subscribe(async (result) => {
        if (result.token) {
          const payment: Payment = await this.paymentService.makePayment({
            amount,
            token: result.token.id,
          });
          console.log(payment);
          this.router.navigate(['/thank-you', payment.transactionId]);
        } else if (result.error) {
          this.paymentError = result.error;
          console.log(result.error.message);
        }
        this.loading = false;
      });
  }


  ngOnDestroy(): void {
  }
}
