import { Component } from '@angular/core';
import { CartServices } from '../../services/cart-services';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-cart-details',
  standalone: false,
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css',
})
export class CartDetails {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  cartItems: CartItem[] = [];

  constructor(public cartService: CartServices) { }

  ngOnInit() {
    this.cartDetails();
  }

  cartDetails() {

    this.cartItems = this.cartService.cartItems;

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();
  }

  updateQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
    this.cartService.computeCartTotals();
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.reduceFromCart(cartItem);
  }

  remove(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }



}
