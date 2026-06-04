import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs/internal/Observable';
import { PaymentInfo } from '../common/payment-info';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {

  baseUrl = 'http://localhost:8080/api/checkout/purchase';

  paymentIntentUrl = 'http://localhost:8080/api/checkout/payment-intent';

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase) : Observable<any> {
    return this.httpClient.post<Purchase>(this.baseUrl, purchase);
  }

  createPaymentIntent(paymentInfo: PaymentInfo) : Observable<any> {
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }
}
