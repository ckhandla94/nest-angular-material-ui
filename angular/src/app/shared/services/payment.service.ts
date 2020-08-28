import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserService } from './auth/user.service';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/models';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    constructor(
        private http: HttpClient,
    ) { }

    getTransactions() {
        return this.http.get<Payment[]>(`payment`).toPromise();
    }


    makePayment(request) {
        return this.http.post('payment/charge', request).toPromise();
    }

    getPaymentInfoByTransactionId(transactionId: string) {
        return this.http.get<Payment>(`payment/transaction/${transactionId}`).toPromise();
    }
}
