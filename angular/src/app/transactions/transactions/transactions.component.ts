import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Payment } from 'src/app/models';
import { Title } from '@angular/platform-browser';
import { getTitle } from 'src/app/shared/utils';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: Payment[];
  loading = true;

  constructor(
    private paymentService: PaymentService,
    title: Title,
  ) {
    title.setTitle(getTitle('Transactions'));
  }

  ngOnInit(): void {
    this.paymentService.getTransactions()
      .then((transactions) => {
        this.transactions = transactions;
      })
      .finally(() => this.loading = false);
  }

}
