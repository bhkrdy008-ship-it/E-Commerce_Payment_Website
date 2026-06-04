import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {

  baseUrl = 'http://localhost:8080/api/checkout/purchase';

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase) : Observable<any> {
    return this.httpClient.post<Purchase>(this.baseUrl, purchase);
  }
}
