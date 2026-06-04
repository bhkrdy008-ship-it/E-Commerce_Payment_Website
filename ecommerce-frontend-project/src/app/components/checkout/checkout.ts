import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout-service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { CheckoutValidation } from '../../common/checkout-validation';
import { CartServices } from '../../services/cart-services';
import { PurchaseService } from '../../services/purchase-service';
import { Router } from '@angular/router';
import { OrderItem } from '../../common/order-item';
import { Purchase } from '../../common/purchase';
import { Order } from '../../common/order';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  states: State[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  checkoutFormGroup: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, private checkoutService: CheckoutService, private cartService: CartServices,
     private purchaseService: PurchaseService, private router: Router) {
  }

  ngOnInit() {

    this.checkoutService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );




    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidation.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidation.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), CheckoutValidation.notOnlyWhitespace])
  }),
  shippingAddress: this.formBuilder.group({
    street: new FormControl('', [Validators.required, CheckoutValidation.notOnlyWhitespace]),
    city: new FormControl('', [Validators.required, CheckoutValidation.notOnlyWhitespace]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, CheckoutValidation.notOnlyWhitespace])
  }),
  billingAddress: this.formBuilder.group({
    street: new FormControl('', [Validators.required, CheckoutValidation.notOnlyWhitespace]),
    city: new FormControl('', [Validators.required, CheckoutValidation.notOnlyWhitespace]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, CheckoutValidation.notOnlyWhitespace])
  }),
  creditCard: this.formBuilder.group({
    cardType: new FormControl('', [Validators.required]),
    nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidation.notOnlyWhitespace]),
    cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16), CheckoutValidation.notOnlyWhitespace]),
    securityCode: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(3), CheckoutValidation.notOnlyWhitespace]),
    expirationMonth: new FormControl('', [Validators.required]),
    expirationYear: new FormControl('', [Validators.required])
  })


});

this.reviewCartDetails();

const startMonth: number = new Date().getMonth() + 1;
console.log("startMonth: " + startMonth);

this.checkoutService.getCreditCardMonths(startMonth).subscribe(
  data => {
    console.log("Retrieved credit card months: " + JSON.stringify(data));
    this.creditCardMonths = data;
  }
);

this.checkoutService.getCreditCardYears().subscribe(
  data => {
    console.log("Retrieved credit card years: " + JSON.stringify(data));
    this.creditCardYears = data;
  }
);

  }

  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }


  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }
  get creditCardExpirationMonth() { return this.checkoutFormGroup.get('creditCard.expirationMonth'); }
  get creditCardExpirationYear() { return this.checkoutFormGroup.get('creditCard.expirationYear'); }

  onSubmit() {

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    const cartItems = this.cartService.cartItems;

    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    let purchase = new Purchase();

    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;
    purchase.order = order;
    purchase.orderItems = orderItems;

    this.purchaseService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

        this.cartService.cartItems = [];
        this.cartService.totalPrice.next(0);
        this.cartService.totalQuantity.next(0);

        this.router.navigateByUrl("/products");
      },
      error: error => {
        alert(`There was an error: ${error.message}`);
      }
    });
  }


  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

        this.billingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;

    this.checkoutService.getStates(countryCode).subscribe(
      data => {
        console.log("Retrieved states: " + JSON.stringify(data));

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }

        formGroup?.get('state')?.setValue(data[0])
      }


    );
  }


}
