import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Payment } from 'src/app/models';
import { getTitle } from 'src/app/shared/utils';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit, OnDestroy {
  transaction: Payment;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    title: Title,
  ) {
    title.setTitle(getTitle('Success'));
  }

  ngOnInit(): void {
    this.activatedRoute
      .params
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        if (params.transactionId) {
          this.getTransaction(params.transactionId);
        }
      });
  }

  getTransaction(transactionId: string) {
    this.paymentService.getPaymentInfoByTransactionId(transactionId).then((transaction) => {
      this.transaction = transaction;
    });
  }

  ngOnDestroy() {

  }

}
